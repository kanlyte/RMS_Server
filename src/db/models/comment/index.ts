import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Comment extends Model {
  comment_id: number;
  comment_message: string;
  comment_fro_id: number;
  comment_to_id: number;
  comment_created_at: string
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
    comment_fro_id: {type: DataTypes.INTEGER},
    comment_to_id: {type: DataTypes.INTEGER},
    comment_created_at: { type: DataTypes.STRING },
  },
  {
    tableName: "comments",
    timestamps: false
  }
);

export default Comment;
