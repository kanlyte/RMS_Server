import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Proposal extends Model {
  proposal_id: number;
  proposal_general: string

}

// admin schema

const Proposal = sequelize.define<v1Proposal>(
  "Proposal",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    proposal_general: {type: DataTypes.STRING}
    
  },
  {
    tableName: "proposals",
    timestamps: false,
  }
);

export default Proposal;
