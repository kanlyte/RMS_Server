import sequelize from "../../../lib";
import { Model, DataTypes } from "sequelize";

// Extend v2User interface to include Sequelize's Model interface
export interface v1User extends Model {
  user_id: number;
  admin_id: number;
  faculty_id: number;
  department_id: number;
  program_id: number;
  year_id: number;
  user_name: string;
  user_reg_no: string;
  user_student_no: string;
  user_email: string;
  user_phone: string;
  user_auth: string;
  refresh_token: string;
}

// Define the user model
const User = sequelize.define<v1User>(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    admin_id: { type: DataTypes.INTEGER, defaultValue: "N/A" },
    faculty_id: { type: DataTypes.INTEGER },
    department_id: { type: DataTypes.INTEGER },
    program_id: { type: DataTypes.INTEGER },
    year_id: { type: DataTypes.INTEGER },
    user_name: { type: DataTypes.STRING },
    user_reg_no: { type: DataTypes.STRING },
    user_student_no: { type: DataTypes.STRING },
    user_email: { type: DataTypes.STRING },
    user_phone: { type: DataTypes.STRING },
    user_auth: { type: DataTypes.STRING },
    refreshtoken: { type: DataTypes.STRING, defaultValue: "N/A" },
  },
  {
    tableName: "user",
  }
);

export default User;
