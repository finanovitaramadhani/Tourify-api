import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardUser from "./pages/DashboardUser";
import DashboardAdmin from "./pages/DashboardAdmin";
import Wisata from "./pages/Wisata";
import Docs from "./pages/Docs";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<Docs />} /> {/* ✅ TAMBAHKAN INI */}

        {/* USER */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <DashboardUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/wisata"
          element={
            <ProtectedRoute role="user">
              <Wisata />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
