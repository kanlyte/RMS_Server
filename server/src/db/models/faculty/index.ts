import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

export interface v1Faculty extends Model {
  faculty_id: number;
  faculty_name: string;
}

// admin schema

const Faculty = sequelize.define<v1Faculty>(
  "Faculty",
  {
    faculty_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    faculty_name: { type: DataTypes.STRING },
  },
  {
    tableName: "faculty",
  }
);

export default Faculty;
