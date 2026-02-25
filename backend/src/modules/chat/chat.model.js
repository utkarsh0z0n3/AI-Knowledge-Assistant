import { DataTypes } from "sequelize";
import sequelize from "../../infra/db.js";

const Chat = sequelize.define("Chat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  question: {
    type: DataTypes.TEXT,
  },
  answer: {
    type: DataTypes.TEXT,
  },
});

export default Chat;