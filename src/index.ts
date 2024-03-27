import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import connect from "./db/index";
import db from "./db/models";

const dotenv = require("dotenv");

const PORT = 5000;
const app: Express = express();

//midleware
dotenv.config();
app.use(cors());
app.use(express.json());

//ping
app.get("/v1", (req: Request, res: Response) => {
    res.send("Do you need to see this really?");
  });

//endpoints


//db connection
connect();
db


//404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    res.send("404");
});
  
//server start
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}....`);
});

