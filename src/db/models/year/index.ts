import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

enum YearOfStudy {
    ONE = '1',
    TWO = '2',
    THREE = '3',
    FOUR = '4',
    FIVE = '5'
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
    year_name: { type: DataTypes.ENUM(...Object.values(YearOfStudy)),
        allowNull: false },
    
  },
  {
    tableName: "years",
    timestamps: false,
  }
);

export default Year;
