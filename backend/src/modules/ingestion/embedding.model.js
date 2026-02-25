import { DataTypes, Model } from "sequelize";
import  sequelize  from "../../infra/db.js";

const Embedding = sequelize.define("Embedding", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  chunk_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  vector: DataTypes.JSONB,
});

export default Embedding;