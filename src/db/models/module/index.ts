import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Module extends Model {
  module_id: number;
  created_by: number;
  module_name: string;
  module_data: string;
  other_submissons: string;

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
    created_by: {type: DataTypes.INTEGER},
    module_name:{type: DataTypes.STRING},
    module_data:{type: DataTypes.STRING},
    other_submissons: {type: DataTypes.STRING},
    
  },
  {
    tableName: "modules",
    timestamps: false,
  }
);

export default Module;
