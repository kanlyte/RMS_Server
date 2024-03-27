import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Chat extends Model {
  chat_id: number;
  chat_message: string;
  chat_fro_id: number;
  chat_to_id: number;
  chat_created_at: string
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
    chat_fro_id: {type: DataTypes.INTEGER},
    chat_to_id: {type: DataTypes.INTEGER},
    chat_created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    tableName: "chats",
    timestamps: false,
  }
);

export default Chat;
