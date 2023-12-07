import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const userName: string = JSON.parse(
    localStorage.getItem("userData") || ""
  ).name;
  const navigate = useNavigate();
  const logOut = () => {
    const haveItem = localStorage.removeItem("userData");
    navigate("/");
  };
  const toOrders = () => {
    navigate("/orders");
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/books">
            {userName}
          </Link>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <form className="d-flex">
            <button type="button" className="btn btn-light" onClick={toOrders}>
              Order
            </button>
            <button type="button" className="btn btn-light" onClick={logOut}>
              Logout
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
