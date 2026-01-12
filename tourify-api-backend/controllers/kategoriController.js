const Kategori = require("../models/Kategori");

// GET semua kategori (admin & user, opsional)
exports.getAllKategori = async (req, res) => {
  try {
    const data = await Kategori.findAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE kategori (admin)
exports.createKategori = async (req, res) => {
  try {
    const { nama_kategori, deskripsi } = req.body;

    const kategori = await Kategori.create({
      nama_kategori,
      deskripsi
    });

    res.status(201).json({
      message: "Kategori berhasil ditambahkan",
      data: kategori
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE kategori (admin)
exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;

    await Kategori.update(req.body, { where: { id } });

    res.json({ message: "Kategori berhasil diperbarui" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE kategori (admin)
exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;

    await Kategori.destroy({ where: { id } });

    res.json({ message: "Kategori berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
