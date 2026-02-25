import { DataTypes } from "sequelize";
import sequelize from "../../infra/db.js";

const Chunk = sequelize.define("Chunk", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  document_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  chunk_index: {
    type: DataTypes.INTEGER,
  },
});

export default Chunk;