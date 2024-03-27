import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Program extends Model {
  program_id: number;
  program_name: string;
  program_code: string
}

// admin schema

const Program = sequelize.define<v1Program>(
  "Program",
  {
    program_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    program_name: { type: DataTypes.STRING },
    program_code: { type: DataTypes.STRING },
    
  },
  {
    tableName: "programs",
    timestamps: false,
  }
);

export default Program;
