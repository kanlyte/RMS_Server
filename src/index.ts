import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import connection from "./db/index";

const dotenv = require("dotenv");

const PORT = 8084;
const app: Express = express();

//midleware
dotenv.config();
app.use(cors());
app.use(express.json());

//ping
app.get("/rms", (req: Request, res: Response) => {
  res.send("Do you need to see this really?");
});

//endpoints

//endpoints

//db connection
connection();

//404
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  res.send("404");
});

//server start
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}....`);
});
