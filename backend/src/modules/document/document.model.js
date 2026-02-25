import { DataTypes } from "sequelize";
import sequelize from "../../infra/db.js";

const Document =  sequelize.define("document", {
    id: {
        type : DataTypes.UUID,
        defaultValue : DataTypes.UUIDV4,
        primaryKey : true
    },
    title: DataTypes.STRING,
    file_path: DataTypes.STRING,
    content : DataTypes.TEXT,
    uploaded_by: DataTypes.UUID
});

export default Document;