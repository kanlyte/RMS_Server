import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

export interface v1Inquiry extends Model {
  inquiry_id: number;
  inquiry_message: string;
  sender_id: number;
  receiver_id: number;
}

// admin schema

const Inquiry = sequelize.define<v1Inquiry>(
  "Inquiry",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    sender_id: { type: DataTypes.INTEGER },
    receiver_id: { type: DataTypes.INTEGER },
    inquiry_message: { type: DataTypes.STRING },
  },
  {
    tableName: "inquiry",
  }
);

export default Inquiry;
