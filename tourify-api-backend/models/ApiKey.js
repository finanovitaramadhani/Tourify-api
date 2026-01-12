const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ApiKey = sequelize.define(
  "api_keys",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    api_key: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: "api_keys",
    timestamps: false
  }
);

module.exports = ApiKey;
