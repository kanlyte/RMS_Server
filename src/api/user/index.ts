import express, { Express, Request, Response } from "express";
import { ResultObj } from "../../lib/index";
import User, { v1User } from "../../db/models/user/index";
import { verifyPhone, verifyEmail, verifyAuth } from "../../lib/index";
const server: Express = express();
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

/*
/account route   ----- route for creating a user

*/
server.post("/account", async (req: Request, res: Response) => {
  const body = {
    faculty_id: req.body.faculty_id as number,
    department_id: req.body.department_id as number,
    program_id: req.body.program_id as number,
    year_id: req.body.year_id as number,
    user_name: req.body.user_name as string,
    user_reg_no: req.body.user_reg_no as String,
    user_student_no: req.body.user_student_no as String,
    user_email: req.body.user_email as String,
    user_phone: req.body.user_phone as String,
    user_auth: req.body.user_auth as String,
  } as v1User;

  try {
    if (verifyEmail(body.user_email)) {
      if (verifyAuth(body.user_auth)) {
        if (verifyPhone(body.user_phone)) {
          const email_check = await User.findOne({
            where: { user_email: body.user_email },
          });
          //encrypt auth
          const encryptedAuth = cryptoJs.AES.encrypt(
            body.user_auth,
            process.env.AUTH_SECRET
          ).toString();

          if (!email_check) {
            const user = await User.create({
              faculty_id: body.faculty_id,
              department_id: body.department_id,
              program_id: body.program_id,
              year_id: body.year_id,
              user_name: body.user_name,
              user_reg_no: body.user_reg_no,
              user_student_no: body.user_student_no,
              user_email: body.user_email,
              user_phone: body.user_phone,
              user_auth: body.user_auth,
            });
            const forward_result: ResultObj = {
              result: user,
              status: true,
              message: "user created",
            };
            res.status(201).json(forward_result);
          } else {
            const forward_result: ResultObj = {
              status: false,
              message: "email already used",
            };
            res.status(409).json(forward_result);
          }
        } else {
          const forward_result: ResultObj = {
            status: false,
            message: "wrong contact format",
          };
          res.status(400).json(forward_result);
        }
      } else {
        const forward_result: ResultObj = {
          status: false,
          message: "Weak password",
        };
        res.status(400).json(forward_result);
      }
    } else {
      const forward_result: ResultObj = {
        status: false,
        message: "wrong email format",
      };
      res.status(400).json(forward_result);
    }
  } catch (error) {
    console.log(error);
    const forward_result: ResultObj = {
      status: false,
      message: "Server error",
    };
    res.status(500).json(forward_result);
  }
});

/*

user login  /login
here when the user logins in, an access token is created and shall be stored in session/local storage 
or cookies in front end app
also, the refresh token shall be generated and stored in the db as refresh_token
more about the use of tokens shall be esplained in there after. 


*/

server.post("/login", async (req: Request, res: Response) => {
  const body = {
    user_email: req.body.user_email as string,
    user_auth: req.body.user_auth as string,
  } as v1User;

  try {
    if (verifyEmail(body.user_email)) {
      const user = await User.findOne({
        where: { user_email: body.user_email },
      });
      if (user) {
        // Decrypt the password stored in the database
        const decryptedAuth = cryptoJs.AES.decrypt(
          user.user_auth,
          process.env.AUTH_SECRET
        ).toString(cryptoJs.enc.Utf8);
        if (decryptedAuth === body.user_auth) {
          //generate access token
          const access_token = jwt.sign(
            {
              phone: user.user_phone,
              auth: user.user_auth,
              email: user.user_email,
              id: user.user_id,
            },
            process.env.ACCESS_SECRET,
            {
              expiresIn: "1d",
            }
          );
          //generate a refresh token
          const refresh_token = jwt.sign(
            {
              phone: user.user_phone,
              auth: user.user_auth,
              email: user.user_email,
              id: user.user_id,
            },
            process.env.REFRESH_SECRET,
            { expiresIn: "7d" }
          );
          const enc_refresh_token = cryptoJs.AES.encrypt(
            refresh_token,
            process.env.ENC_REFRESH_SECRET
          ).toString();
          //store encrypted refresh token in the db
          user.refresh_token = enc_refresh_token;
          await user.save();

          //return user
          const return_user = {
            user_id: user.user_id,
            name: user.user_name,
            email: user.user_email,
            phone: user.user_phone,
            auth: user.user_auth,
            refresh_token: enc_refresh_token,
            access_token: access_token,
          };
          const forward_result: ResultObj = {
            status: true,
            result: return_user,
            message: "login sucessful",
          };
          res.status(200).json(forward_result);
        } else {
          const forward_result: ResultObj = {
            status: false,
            message: "Wrong password",
          };
          res.status(401).json(forward_result);
        }
      } else {
        const forward_result: ResultObj = {
          status: false,
          message: "User not found",
        };
        res.status(404).json(forward_result);
      }
    } else {
      const forward_result: ResultObj = {
        status: false,
        message: "Wrong email format",
      };
      res.status(400).json(forward_result);
    }
  } catch (error) {
    console.error("Error:", error);
    const forward_result: ResultObj = {
      status: false,
      message: "Server error",
    };
    res.status(500).json(forward_result);
  }
});
