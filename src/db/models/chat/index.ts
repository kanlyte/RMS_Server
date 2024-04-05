import { Model, DataTypes } from "sequelize";
import sequelize from "../../../lib";

export interface v1Chat extends Model {
  chat_id: number;
  chat_message: string;
  sender_id: number;
  receiver_id: number;
}

// admin schema

const Chat = sequelize.define<v1Chat>(
  "Chat",
  {
    chat_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    chat_message: { type: DataTypes.STRING },
    sender_id: { type: DataTypes.INTEGER },
    receiver_id: { type: DataTypes.INTEGER },
  },
  {
    tableName: "chat",
  }
);

export default Chat;
