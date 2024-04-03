import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

export interface v1Department extends Model {
  department_id: number;
  faculty_id: number;
  department_name: string;
}

// admin schema

const Department = sequelize.define<v1Department>(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    faculty_id: { type: DataTypes.INTEGER },
    department_name: { type: DataTypes.STRING },
  },
  {
    tableName: "department",
  }
);

export default Department;
