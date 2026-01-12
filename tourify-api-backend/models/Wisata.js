const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Kategori = require("./Kategori");

const Wisata = sequelize.define(
  "wisata",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nama_wisata: DataTypes.STRING,
    lokasi: DataTypes.STRING,
    deskripsi: DataTypes.TEXT,
    gambar: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(10, 7),
    longitude: DataTypes.DECIMAL(10, 7),

    kategori_id: {
    type: DataTypes.INTEGER,
    allowNull: false
    },

    sumber_data: {
      type: DataTypes.STRING,
      defaultValue: "OpenStreetMap"
    }
  },
  {
    tableName: "wisata",
    timestamps: false
  }
);

// relasi
Wisata.belongsTo(Kategori, {
  foreignKey: "kategori_id",
  as: "kategori" 
});


module.exports = Wisata;
