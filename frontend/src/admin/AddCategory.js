import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCaregory } from "./helper/adminapicall";

function AddCategory() {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const successMessage = () => {
    if (success)
      return <h4 className="text-success">Category created successfully!</h4>;
  };
  const warningMessage = () => {
    if (error)
      return <h4 className="text-danger">Failed to create Category!</h4>;
  };

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For example: Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create category
        </button>
      </div>
    </form>
  );

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Go to admin home
      </Link>
    </div>
  );
  const handleChange = (e) => (setError(""), setName(e.target.value));
  const onSubmit = (e) => (
    e.preventDefault(),
    setError(""),
    setSuccess(false),
    //backend request fired
    createCaregory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(true);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    })
  );

  return (
    <div>
      <Base
        title="Create a new category"
        description="Add a new category for new tshirts"
        className="container bg-info p-4"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {myCategoryForm()}
            {goBack()}
          </div>
        </div>
      </Base>
    </div>
  );
}

export default AddCategory;
