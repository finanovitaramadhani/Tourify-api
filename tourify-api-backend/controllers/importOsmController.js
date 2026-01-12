const axios = require("axios");
const Wisata = require("../models/Wisata");
const Kategori = require("../models/Kategori");

/* =======================
   AREA KOTA / KABUPATEN
======================= */
const AREAS = {
  yogyakarta: "Kota Yogyakarta",
  sleman: "Kabupaten Sleman",
  bantul: "Kabupaten Bantul",
  gunungkidul: "Kabupaten Gunungkidul",
  kulonprogo: "Kabupaten Kulon Progo"
};

exports.importFromOSM = async (req, res) => {
  try {
    const { area } = req.body;

    if (!area || !AREAS[area]) {
      return res.status(400).json({ message: "Area tidak valid" });
    }

    console.log("🚀 IMPORT OSM KOTA:", area);

    const query = `
      [out:json][timeout:60];
      area["name"="${AREAS[area]}"]["boundary"="administrative"]->.searchArea;
      (
        node["tourism"](area.searchArea);
      );
      out body 100;
    `;

    const osmRes = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      { headers: { "Content-Type": "text/plain" } }
    );

    console.log("📦 Data diterima:", osmRes.data.elements.length);

    let inserted = 0;

    for (const item of osmRes.data.elements) {
      if (!item.tags?.name) continue;

      const tourismTag = item.tags.tourism || "lainnya";

      let kategori = await Kategori.findOne({
        where: { nama_kategori: tourismTag }
      });

      if (!kategori) {
        kategori = await Kategori.create({
          nama_kategori: tourismTag,
          deskripsi: "Kategori otomatis dari OpenStreetMap"
        });
      }

      const [, created] = await Wisata.findOrCreate({
        where: { nama_wisata: item.tags.name },
        defaults: {
          lokasi:
            item.tags["addr:full"] ||
            item.tags["addr:city"] ||
            AREAS[area],
          deskripsi:
            item.tags.description ||
            "Data dari OpenStreetMap",
          kategori_id: kategori.id,
          latitude: item.lat,
          longitude: item.lon,
          sumber_data: "OpenStreetMap"
        }
      });

      if (created) inserted++;
    }

    console.log("✅ IMPORT SELESAI:", inserted);

    res.json({
      message: `Import OSM ${area} berhasil`,
      total_data: inserted
    });

  } catch (err) {
    console.error("❌ IMPORT OSM ERROR:", err.message);
    res.status(500).json({
      message: "Gagal import OpenStreetMap",
      error: err.message
    });
  }
};
