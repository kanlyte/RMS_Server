import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config";

export interface v1FieldData extends Model {
  field_data_id: number;
  field_id: number;
  user_id: number;
  field_data: string;
}

// Field Data schema

const FieldData = sequelize.define<v1FieldData>(
  "FieldData",
  {
    field_data_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    field_id: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    field_data: { type: DataTypes.STRING },
  },
  {
    tableName: "field_data",
  }
);

export default FieldData;
