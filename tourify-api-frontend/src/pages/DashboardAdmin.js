import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/admin.css";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ================= MAP CLICK HANDLER ================= */
function MapClick({ setLatitude, setLongitude, setLokasi }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setLatitude(lat);
      setLongitude(lng);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      if (data.display_name) {
        setLokasi(data.display_name);
      }
    }
  });
  return null;
}

function DashboardAdmin() {
  const token = localStorage.getItem("token");

  /* ================= KATEGORI ================= */
  const [kategori, setKategori] = useState([]);
  const [namaKategori, setNamaKategori] = useState("");
  const [editKategoriId, setEditKategoriId] = useState(null);

  /* ================= WISATA ================= */
  const [wisata, setWisata] = useState([]);
  const [namaWisata, setNamaWisata] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [editWisataId, setEditWisataId] = useState(null);
  const [gambar, setGambar] = useState(null);

  /* ================= USER ================= */
  const [users, setUsers] = useState([]);

  /* ================= MAP ================= */
  const [mapCenter, setMapCenter] = useState([-7.7956, 110.3695]);

  /* ================= LOAD DATA ================= */
  const loadKategori = async () => {
    const res = await api.get("/admin/kategori", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setKategori(res.data);
  };

  const loadWisata = async () => {
    const res = await api.get("/admin/wisata", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setWisata(res.data);
  };

  const loadUsers = async () => {
    const res = await api.get("/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  useEffect(() => {
    loadKategori();
    loadWisata();
    loadUsers();
  }, []);

  /* ================= IMPORT OSM ================= */
  const importOSM = async (city) => {
    if (!window.confirm(`Import data OpenStreetMap untuk ${city}?`)) return;

    try {
      await api.post(
        "/admin/import/osm",
        { area: city },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`Import OSM ${city} berhasil`);
      loadWisata();
    } catch (err) {
      console.error(err);
      alert("Gagal import OSM");
    }
  };

  /* ================= CRUD KATEGORI ================= */
  const submitKategori = async () => {
    if (!namaKategori) return alert("Nama kategori wajib diisi");

    if (editKategoriId) {
      await api.put(
        `/admin/kategori/${editKategoriId}`,
        { nama_kategori: namaKategori },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await api.post(
        "/admin/kategori",
        { nama_kategori: namaKategori },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }

    setNamaKategori("");
    setEditKategoriId(null);
    loadKategori();
  };

  const editKategori = (k) => {
    setEditKategoriId(k.id);
    setNamaKategori(k.nama_kategori);
  };

  const deleteKategori = async (id) => {
    if (!window.confirm("Hapus kategori ini?")) return;

    await api.delete(`/admin/kategori/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadKategori();
  };

  /* ================= CRUD WISATA ================= */
  const submitWisata = async () => {
  if (!namaWisata || !kategoriId) {
    return alert("Nama wisata & kategori wajib diisi");
  }

  const formData = new FormData();
  formData.append("nama_wisata", namaWisata);
  formData.append("deskripsi", deskripsi);
  formData.append("lokasi", lokasi);
  formData.append("latitude", latitude);
  formData.append("longitude", longitude);
  formData.append("kategori_id", kategoriId);
  if (gambar) formData.append("gambar", gambar);

  try {
    if (editWisataId) {
      // UPDATE
      await api.put(
        `/admin/wisata/${editWisataId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Wisata berhasil diperbarui");
    } else {
      // CREATE
      await api.post(
        "/admin/wisata",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Wisata berhasil ditambahkan");
    }

    resetForm();
    loadWisata();
  } catch (err) {
    console.error(err);
    alert("Gagal menyimpan data wisata");
  }
};


  const editWisata = (w) => {
    setEditWisataId(w.id);
    setNamaWisata(w.nama_wisata);
    setDeskripsi(w.deskripsi);
    setLokasi(w.lokasi);
    setLatitude(w.latitude);
    setLongitude(w.longitude);
    setKategoriId(w.kategori_id);
    setMapCenter([w.latitude, w.longitude]);
  };

  const deleteWisata = async (id) => {
    if (!window.confirm("Hapus data wisata ini?")) return;

    await api.delete(`/admin/wisata/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    loadWisata();
  };

  const resetForm = () => {
    setEditWisataId(null);
    setNamaWisata("");
    setDeskripsi("");
    setLokasi("");
    setLatitude("");
    setLongitude("");
    setKategoriId("");
    setGambar(null);
  };

  /* ================= SEARCH ALAMAT ================= */
  const searchAddress = async () => {
    if (!lokasi) return alert("Masukkan alamat atau nama tempat");

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          lokasi
        )}`
      );

      const data = await res.json();
      if (!data.length) return alert("Alamat tidak ditemukan");

      const result = data[0];
      const lat = parseFloat(result.lat).toFixed(6);
      const lon = parseFloat(result.lon).toFixed(6);

      setLokasi(result.display_name);
      setLatitude(lat);
      setLongitude(lon);
      setMapCenter([lat, lon]);
    } catch (err) {
      console.error(err);
      alert("Gagal mencari alamat");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="admin">
      <h1>Admin Dashboard</h1>
      <p className="subtitle">Manage tourism data</p>

      {/* IMPORT OSM */}
      <div className="admin-actions">
        <button onClick={() => importOSM("yogyakarta")}>Import Kota Yogyakarta</button>
        <button onClick={() => importOSM("sleman")}>Import Sleman</button>
        <button onClick={() => importOSM("bantul")}>Import Bantul</button>
        <button onClick={() => importOSM("gunungkidul")}>Import Gunungkidul</button>
        <button onClick={() => importOSM("kulonprogo")}>Import Kulon Progo</button>
      </div>

      {/* TAMBAH / EDIT WISATA */}
      <div className="admin-section">
        <h2>{editWisataId ? "Edit Wisata" : "Tambah Wisata"}</h2>

        <div className="wisata-form">
          <input placeholder="Nama Wisata" value={namaWisata} onChange={e => setNamaWisata(e.target.value)} />
          <textarea placeholder="Deskripsi" value={deskripsi} onChange={e => setDeskripsi(e.target.value)} />
          <input placeholder="Alamat / Lokasi" value={lokasi} onChange={e => setLokasi(e.target.value)} />
          <button onClick={searchAddress}>Cari Lokasi</button>

          <input placeholder="Latitude" value={latitude} readOnly />
          <input placeholder="Longitude" value={longitude} readOnly />

          <select value={kategoriId} onChange={e => setKategoriId(e.target.value)}>
            <option value="">Pilih Kategori</option>
            {kategori.map(k => (
              <option key={k.id} value={k.id}>{k.nama_kategori}</option>
            ))}
          </select>

          <input type="file" accept="image/*" onChange={e => setGambar(e.target.files[0])} />

          <MapContainer center={mapCenter} zoom={11} style={{ height: "300px" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <MapClick setLatitude={setLatitude} setLongitude={setLongitude} setLokasi={setLokasi} />
            {latitude && longitude && <Marker position={[latitude, longitude]} />}
          </MapContainer>

          <button className="primary" onClick={submitWisata}>
            {editWisataId ? "Update" : "Create"}
          </button>
        </div>
      </div>

      {/* USERS */}
      <div className="admin-section">
        <h2>Data User</h2>

        {users.length === 0 && <p>Tidak ada user</p>}

        {users.map(u => (
          <div key={u.id} className="admin-row">
            <div>
              <strong>{u.username}</strong>
              <p>Role: {u.role}</p>
              <small>{new Date(u.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>

      {/* KELOLA KATEGORI */}
      <div className="admin-section">
        <h2>Kelola Kategori</h2>

        <div className="admin-form">
          <input placeholder="Nama kategori" value={namaKategori} onChange={e => setNamaKategori(e.target.value)} />
          <button onClick={submitKategori}>
            {editKategoriId ? "Update" : "Tambah"}
          </button>
        </div>

        {kategori.map(k => (
          <div className="admin-row" key={k.id}>
            <span>{k.nama_kategori}</span>
            <div>
              <button onClick={() => editKategori(k)}>Edit</button>
              <button className="danger" onClick={() => deleteKategori(k.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* DATA WISATA */}
<div className="admin-section">
  <h2>Data Wisata</h2>

  {wisata.map(w => (
    <div className="admin-row wisata-card" key={w.id}>
      <div className="wisata-info">
        <h3 className="wisata-title">{w.nama_wisata}</h3>

        {w.deskripsi && (
          <p className="wisata-desc">{w.deskripsi}</p>
        )}

        <p className="wisata-lokasi">{w.lokasi}</p>

        {w.gambar && (
          <img
            src={`http://localhost:3000${w.gambar}`}
            alt={w.nama_wisata}
            className="wisata-img"
          />
        )}
      </div>

      <div className="wisata-actions">
        <button onClick={() => editWisata(w)}>Edit</button>
        <button
          className="danger"
          onClick={() => deleteWisata(w.id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}

export default DashboardAdmin;
