import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

export interface v1Comment extends Model {
  comment_id: number;
  comment_message: string;
  sender_id: number;
  receiver_id: number;
}

// admin schema

const Comment = sequelize.define<v1Comment>(
  "Comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    comment_message: { type: DataTypes.STRING },
    sender_id: { type: DataTypes.INTEGER },
    receiver_id: { type: DataTypes.INTEGER },
  },
  {
    tableName: "comment",
  }
);

export default Comment;
