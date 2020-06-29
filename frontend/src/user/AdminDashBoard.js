import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";

function AdminDashBoard() {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const adminRightSide = () => {};
  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="class-header p-2 bg-dark text-white">
          Admin Navigation
        </h4>
        <ul className="list-group bg">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Order
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to the Admin area"
      description="Manage of all your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
}

export default AdminDashBoard;
