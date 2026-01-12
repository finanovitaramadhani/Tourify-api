import { useState } from "react";
import api from "../api/axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "../styles/wisata.css";

/* ================= FIX ICON LEAFLET ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

/* ================= MAP FOCUS HANDLER ================= */
function MapFocus({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Wisata() {
  const [apiKey, setApiKey] = useState("");
  const [wisata, setWisata] = useState([]);
  const [loading, setLoading] = useState(false);

  const [activeId, setActiveId] = useState(null);
  const [mapCenter, setMapCenter] = useState([-7.8, 110.36]);
  const [mapZoom, setMapZoom] = useState(11);

  /* ================= LOAD DATA ================= */
  const loadWisata = async () => {
    if (!apiKey) return alert("API Key wajib diisi");

    setLoading(true);
    try {
      const res = await api.get("/wisata?page=1&limit=50", {
        headers: { "x-api-key": apiKey }
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];

      setWisata(data);
    } catch (err) {
      alert("Gagal mengambil data wisata");
      setWisata([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CARD CLICK ================= */
  const openDetail = (w) => {
    setActiveId(w.id);

    if (w.latitude && w.longitude) {
      setMapCenter([Number(w.latitude), Number(w.longitude)]);
      setMapZoom(15);
    }
  };

  return (
    <div className="wisata-page">
      <h1>Tourism Data</h1>
      <p className="subtitle">Explore tourism destinations using Tourify API</p>

      {/* API KEY */}
      <div className="apikey-box">
        <input
          placeholder="Paste your API Key here"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <button onClick={loadWisata}>
          {loading ? "Loading..." : "Load Data"}
        </button>
      </div>

      <div className="content">
        {/* GRID */}
        <div className="list">
          <div className="wisata-grid">
            {wisata.map((w) => (
              <div
                key={w.id}
                className={`wisata-card ${activeId === w.id ? "active" : ""}`}
                onClick={() => openDetail(w)}
              >
                {/* FOTO */}
                <div className="wisata-thumb auto-height">
                  {w.gambar ? (
                    <img
                      src={`http://localhost:3000${w.gambar}`}
                      alt={w.nama_wisata}
                    />
                  ) : (
                    <div className="placeholder">No Image</div>
                  )}
                </div>

                {/* NAMA */}
                <div className="wisata-name">{w.nama_wisata}</div>

                {/* KATEGORI */}
                {(w.Kategori || w.kategori) && (
                  <div className="wisata-kategori">
                    {(w.Kategori || w.kategori).nama_kategori}
                  </div>
                )}

                {/* CLICK TEXT */}
                <div className="wisata-click">Click for Details &gt;</div>

                {/* DETAIL INLINE */}
                {activeId === w.id && (
                  <div className="wisata-detail-inline">
                    {w.deskripsi && w.deskripsi !== "Data dari OpenStreetMap" && (
                      <p>{w.deskripsi}</p>
                    )}
                    <small>{w.lokasi}</small>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* MAP */}
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="map"
        >
          <MapFocus center={mapCenter} zoom={mapZoom} />

          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {wisata
            .filter((w) => w.latitude && w.longitude)
            .map((w) => (
              <Marker
                key={w.id}
                position={[Number(w.latitude), Number(w.longitude)]}
              >
                <Popup>
                  <strong>{w.nama_wisata}</strong>
                  <br />
                  {w.lokasi}
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Wisata;
