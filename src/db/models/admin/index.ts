import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";
import connection from "../..";

enum AdminRole {
  SUPER_ADMIN = 'super admin',
  LECTURER = 'lecturer',
  DEAN_OR_HOD = 'Dean or HOD',
  RESEARCH_DIRECTORATE = 'Research-Directorate'
}

export interface v1Admin extends Model {
  admin_id: number,
    admin_role: AdminRole,
    admin_name: string,
    admin_email: string,
    admin_phone: string,
    admin_auth: string,
    refresh_token: string,
}

// admin schema

const Admin = sequelize.define<v1Admin>(
  "Admin",
  {
    admin_id: {
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false,
    },
    admin_role: {
        type: DataTypes.ENUM(...Object.values(AdminRole)),
        allowNull: false
    },
    admin_name: {type: DataTypes.STRING},
    admin_email: {type: DataTypes.STRING},
    admin_phone: {type: DataTypes.STRING},
    admin_auth: {type: DataTypes.STRING},
    refresh_token: {type: DataTypes.STRING},
},
  {
    tableName: "admins",
    timestamps: false,
  }
);

export default Admin;
