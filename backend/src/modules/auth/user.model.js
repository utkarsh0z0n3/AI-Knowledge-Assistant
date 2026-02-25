import { DataTypes }   from "sequelize";

import sequelize from "../../infra/db.js";


const User = sequelize.define("User",{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role:{
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
    }

});

export default User;