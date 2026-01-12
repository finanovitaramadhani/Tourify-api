import { NavLink, useNavigate } from "react-router-dom";
import "../styles/main.css";


function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="logo">
  Tourify<span className="logo-accent">API</span>
</div>

      

      <div className="nav-links">
        {/* PUBLIC */}
        <NavLink to="/docs" className={linkClass}>
          Docs
        </NavLink>

        {!role && (
          <>
            <NavLink to="/" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}

        {/* USER */}
        {role === "user" && (
          <>
            <NavLink to="/user" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/user/wisata" className={linkClass}>
              Wisata
            </NavLink>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}

        {/* ADMIN */}
        {role === "admin" && (
          <>
            <NavLink to="/admin" className={linkClass}>
              Admin
            </NavLink>
            <button onClick={logout} className="logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
