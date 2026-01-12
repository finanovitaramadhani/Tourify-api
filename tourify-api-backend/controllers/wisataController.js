const Wisata = require("../models/Wisata");
const Kategori = require("../models/Kategori");

/* =====================================================
   USER READ (API KEY)
===================================================== */
exports.getAllWisata = async (req, res) => {
  try {
    const data = await Wisata.findAll({
      include: {
        model: Kategori,
        as: "kategori",
        attributes: ["nama_kategori"]
      },
      order: [["id", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    console.error("GET WISATA ERROR:", err);
    res.status(500).json({
      message: "Gagal mengambil data wisata"
    });
  }
};

/* =====================================================
   ADMIN CREATE (UPLOAD FOTO)
===================================================== */
exports.createWisata = async (req, res) => {
  try {
    const data = {
      ...req.body,
      sumber_data: "manual" 
    };

    // SIMPAN FOTO
    if (req.file) {
      data.gambar = `/uploads/wisata/${req.file.filename}`;
    }

    const wisata = await Wisata.create(data);

    res.status(201).json({
      message: "Wisata berhasil ditambahkan",
      data: wisata
    });
  } catch (err) {
    console.error("CREATE WISATA ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


/* =====================================================
   ADMIN UPDATE (GANTI FOTO)
===================================================== */
exports.updateWisata = async (req, res) => {
  try {
    const { id } = req.params;

    const data = {
  ...req.body
};

if (!data.sumber_data) {
  data.sumber_data = "manual";
}


    // UPDATE FOTO JIKA ADA
    if (req.file) {
      data.gambar = `/uploads/wisata/${req.file.filename}`;
    }

    await Wisata.update(data, { where: { id } });

    res.json({ message: "Wisata berhasil diperbarui" });
  } catch (err) {
    console.error("UPDATE WISATA ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   ADMIN DELETE
===================================================== */
exports.deleteWisata = async (req, res) => {
  try {
    const { id } = req.params;
    await Wisata.destroy({ where: { id } });

    res.json({ message: "Wisata berhasil dihapus" });
  } catch (err) {
    console.error("DELETE WISATA ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* =====================================================
   ADMIN READ
===================================================== */
exports.getAllWisataAdmin = async (req, res) => {
  try {
    const data = await Wisata.findAll({
      include: {
        model: Kategori,
        as: "kategori",
        attributes: ["nama_kategori"]
      },
      order: [["id", "DESC"]]
    });

    res.json(data);
  } catch (err) {
    console.error("GET ADMIN WISATA ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
