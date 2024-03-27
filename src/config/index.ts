import { Sequelize } from "sequelize";
import models from "../db/models";

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: require("mysql2"),
  host: "localhost",
  database: "v1research",
  username: "root",
  password: "",

  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
}

);



export interface ResultObj {
  result?: any;
  status: boolean;
  reason: string;
}

export default sequelize;
