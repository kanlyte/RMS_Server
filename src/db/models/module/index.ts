import { Model, DataTypes } from "sequelize";
import sequelize from "../../../lib";

export interface v1Module extends Model {
  module_id: number;
  admin_id: number;
  module_name: string;
  module_message: string;
}

// admin schema

const Module = sequelize.define<v1Module>(
  "Module",
  {
    module_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    admin_id: { type: DataTypes.INTEGER },
    module_name: { type: DataTypes.STRING },
    module_message: { type: DataTypes.STRING },
  },
  {
    tableName: "module",
  }
);

export default Module;
