import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/dashboard.css";

function DashboardUser() {
  const [apiKeys, setApiKeys] = useState([]);
  const token = localStorage.getItem("token");

  const loadKeys = async () => {
    const res = await api.get("/apikey/my", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setApiKeys(res.data);
  };

  const createKey = async () => {
    await api.post(
      "/apikey/create",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    loadKeys();
  };

  const copyKey = key => {
    navigator.clipboard.writeText(key);
    alert("API Key copied");
  };

  useEffect(() => {
    loadKeys();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="subtitle">
        Manage your API keys for accessing Tourify API
      </p>

      <div className="api-section">
        <div className="section-header">
          <h2>Your API Keys</h2>
          <button onClick={createKey}>+ Generate API Key</button>
        </div>

        {apiKeys.length === 0 && (
          <p className="empty">You don’t have any API keys yet.</p>
        )}

        {apiKeys.map(k => (
          <div className="api-card" key={k.id}>
            <div className="key-text">
              {k.api_key.substring(0, 20)}••••••••••
            </div>
            <button onClick={() => copyKey(k.api_key)}>Copy</button>
          </div>
        ))}
      </div>

      <div className="usage">
        <h2>API Usage</h2>
        <pre>
{`GET /api/wisata?page=1&limit=10
x-api-key: YOUR_API_KEY`}
        </pre>
      </div>
    </div>
  );
}

export default DashboardUser;
