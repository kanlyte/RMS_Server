import { Sequelize } from "sequelize";
const cryptoJs = require("crypto-js");
const { ACCESS_SECRET, REFRESH_SECRET, ENC_REFRESH_SECRET } = process.env;
const jwt = require("jsonwebtoken");
import { VerifyErrors, JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

//sequalize connection file
const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: require("mysql2"),
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
});

//result object
export interface ResultObj {
  result?: any;
  status: boolean;
  message: string;
}

// Method for verifying password
export const verifyAuth = (auth: string): boolean => {
  const lengthRegex: RegExp = /^.{8,}$/; // At least 8 characters
  const uppercaseRegex: RegExp = /[A-Z]/; // At least one uppercase letter
  const lowercaseRegex: RegExp = /[a-z]/; // At least one lowercase letter
  const digitRegex: RegExp = /\d/; // At least one digit
  const specialCharRegex: RegExp = /[!@#$%^&*(),.?":{}|<>]/; // At least one special character

  // Check if the password meets all criteria
  const isLengthValid: boolean = lengthRegex.test(auth);
  const isUppercaseValid: boolean = uppercaseRegex.test(auth);
  const isLowercaseValid: boolean = lowercaseRegex.test(auth);
  const isDigitValid: boolean = digitRegex.test(auth);
  const isSpecialCharValid: boolean = specialCharRegex.test(auth);

  // Return true if all criteria are met, otherwise false
  return (
    isLengthValid &&
    isUppercaseValid &&
    isLowercaseValid &&
    isDigitValid &&
    isSpecialCharValid
  );
};

//method for verifying email
export const verifyEmail = (email: string) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
  if (email.match(regex)) {
    return true;
  } else {
    return false;
  }
};

// Method for verifying phone number
export const verifyPhone = (phone: string): boolean => {
  // Check if the phone number consists of exactly 10 numeric digits, including the first zero
  const phoneRegex: RegExp = /^(?:\+256\d{9}|0\d{9})$/;
  // Check if the phone number follows the specified format
  return phoneRegex.test(phone);
};

//verify access token
export const verifyAccessToken = (req: Request, res: Response, next: any) => {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      const forward_result: ResultObj = {
        status: false,
        message: "error | no correct token in header",
      };
      res.status(401).json(forward_result);
    } else {
      const [bearer, token] = authHeader.split(" ");
      if (bearer !== "Bearer" || !token) {
        const forward_result: ResultObj = {
          status: false,
          message: "error | invalid token formart",
        };
        res.status(401).json(forward_result);
      } else {
        jwt.verify(
          token,
          ACCESS_SECRET,
          (err: VerifyErrors | null, decoded: JwtPayload) => {
            if (err) {
              console.log(err);
              const forward_result: ResultObj = {
                status: false,
                message: "error |  invalid access token",
              };
              res.status(401).json(forward_result);
            } else {
              req.body.auth = decoded;
              next();
            }
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    const forward_result: ResultObj = {
      status: false,
      message: "Server error",
    };
    res.status(500).json(forward_result);
  }
};

// Function to verify the refresh token using JWT
function verifyRefreshToken(
  refreshToken: string,
  secret: string | undefined
): Promise<any> {
  return new Promise((resolve, reject) => {
    if (!secret) {
      reject(new Error("Refresh token secret is not defined"));
      return;
    }

    jwt.verify(
      refreshToken,
      secret,
      (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}

export const tokenRefresh = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const EncryptedRefreshToken = req.body.refresh_token;

    if (!EncryptedRefreshToken) {
      const forward_result: ResultObj = {
        status: false,
        message: "invalid token | no token",
      };
      res.status(500).json(forward_result);
    }

    // Decrypting the refresh token
    const refreshToken = cryptoJs.AES.decrypt(
      EncryptedRefreshToken,
      ENC_REFRESH_SECRET
    ).toString(cryptoJs.enc.Utf8);

    console.log("Decrypted Refresh Token:", refreshToken);

    if (!refreshToken) {
      const forward_result: ResultObj = {
        status: false,
        message: "failed to decrypty token",
      };
      res.status(500).json(forward_result);
    }

    verifyRefreshToken(refreshToken, REFRESH_SECRET)
      .then((decoded: any) => {
        let phone = decoded.user_phone || decoded.admin_phone;
        let id = decoded.user_id || decoded.admin_id;
        let auth = decoded.user_auth || decoded.admin_auth;
        let email = decoded.user_email || decoded.admin_email;

        // Generate a new access token
        const newAccessToken = jwt.sign(
          {
            phone: phone,
            auth: auth,
            email: email,
            id: id,
          },
          ACCESS_SECRET,
          {
            expiresIn: "7d",
          }
        );

        // Attach the new access token to the request
        req.body.accessToken = newAccessToken;
        next();
      })
      .catch((err) => {
        console.error("Error verifying refresh token:", err);
        const forward_result: ResultObj = {
          status: false,
          message: "token verification failed",
        };
        res.status(500).json(forward_result);
      });
  } catch (error) {
    const forward_result: ResultObj = {
      status: false,
      message: "refresh token has issues",
    };
    res.status(500).json(forward_result);
  }
};
export default sequelize;
