import { Model, DataTypes } from "sequelize";
import sequelize from "../../../lib";

export interface v1Field extends Model {
  field_id: number;
  module_id: number;
  field_type: string;
  field_name: string;
}

// Field schema
const Field = sequelize.define<v1Field>(
  "Field",
  {
    field_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    module_id: { type: DataTypes.INTEGER },
    field_type: { type: DataTypes.STRING },
    field_name: { type: DataTypes.STRING },
  },
  {
    tableName: "field",
  }
);

export default Field;
