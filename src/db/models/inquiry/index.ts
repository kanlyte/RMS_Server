import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";


export interface v1Inquiry extends Model {
  inquiry_id: number;
  inquiry_message: string;
  inquiry_fro_id: number;
  inquiry_to_id: number;
  inquiry_created_at: string
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
    inquiry_message: { type: DataTypes.STRING },
    inquiry_fro_id: {type: DataTypes.INTEGER},
    inquiry_to_id: {type: DataTypes.INTEGER},
    inquiry_created_at: { type: DataTypes.STRING },
  },
  {
    tableName: "inquirys",
    timestamps: false,
  }
);

export default Inquiry;
