import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "mysql",
  dialectModule: require("mysql2"),
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USER,
  password: process.env.USER_PASSWORD,
});

export interface ResultObj {
  result?: any;
  status: boolean;
  reason: string;
}

export default sequelize;
