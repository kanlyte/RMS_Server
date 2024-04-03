import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

enum YearOfStudy {
  ONE = "one",
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
}

export interface v1Year extends Model {
  year_id: number;
  year_name: string;
}

// admin schema

const Year = sequelize.define<v1Year>(
  "Year",
  {
    year_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    year_name: {
      type: DataTypes.ENUM(...Object.values(YearOfStudy)),
      allowNull: false,
    },
  },
  {
    tableName: "year",
  }
);

export default Year;
