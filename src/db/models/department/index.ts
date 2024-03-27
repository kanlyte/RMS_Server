import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Department extends Model {
  department_id: number;
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
    department_name: { type: DataTypes.STRING },
  },
  {
    tableName: "departments",
    timestamps: false,
  }
);

export default Department;
