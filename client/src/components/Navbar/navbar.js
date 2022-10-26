import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import navCSS from "./navbar.module.css";
import memories from "../../images/memories.png";
// import Avatar from "@mui/material/Avatar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    window.location.reload();
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <section className={navCSS.header}>
      <div className={navCSS.title}>
        <h1 className={navCSS.memories}>
          <Link to="/">Memories</Link>
        </h1>
        <img className={navCSS.memoriesimage} src={memories} alt="memories" />
      </div>
      <div className={navCSS.profile}>
        {user ? (
          <>
            {/* <Avatar alt={user.username} src={user.image}>
              {user.username.CharAt(0)}
            </Avatar> */}
            <h6 className={navCSS.creator}>{user?.result?.name}</h6>
            <button
              type="button"
              onClick={logout}
              className={`btn btn-primary ${navCSS.button}`}
            >
              Logout
            </button>
          </>
        ) : (
          <button type="button" className={`btn btn-primary ${navCSS.button}`}>
            <Link style={{ color: "#fff", textDecoration: "none" }} to="/auth">
              Sign In
            </Link>
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
