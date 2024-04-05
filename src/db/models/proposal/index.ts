import { Model, DataTypes } from "sequelize";
import sequelize from "../../../lib";

export interface v1Proposal extends Model {
  proposal_id: number;
  user_id: number;
  proposal_general: string;
}

// proposal schema

const Proposal = sequelize.define<v1Proposal>(
  "Proposal",
  {
    proposal_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user_id: { type: DataTypes.STRING },
    proposal_general: { type: DataTypes.STRING },
  },
  {
    tableName: "proposal",
  }
);

export default Proposal;
