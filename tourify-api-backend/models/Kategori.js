const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Kategori = sequelize.define(
  "kategori",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_kategori: DataTypes.STRING,
    deskripsi: DataTypes.TEXT
  },
  {
    tableName: "kategori",
    timestamps: false
  }
);

module.exports = Kategori;
