import React, { useState, useEffect } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const MechanicUpdatePage = () => {
  const [mechanicData, setMechanicData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: 0,
    mechanic_rating: 0,
    car_times_repaired: 0,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ideally, fetch mechanic data from the server or use the current logged-in user's data
    // This could be fetched via an API call
    // For example:
    // axios.get('/mechanics/profile')
    //   .then(response => setMechanicData(response.data))
    //   .catch(error => console.log(error));

    // For now, you can assume the data is available as an object
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMechanicData({ ...mechanicData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "/mechanics/update";
      const payload = {
        user_data: {
          firstname: mechanicData.firstname,
          lastname: mechanicData.lastname,
          email: mechanicData.email,
        },
        mechanic_data: {
          age: mechanicData.age,
          mechanic_rating: mechanicData.mechanic_rating,
          car_times_repaired: mechanicData.car_times_repaired,
        },
      };

      const response = await axios.put(endpoint, payload);
      setResponseMessage("Mechanic information updated successfully.");
      navigate("/dashboard"); // Redirect back to the dashboard after success
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Update Mechanic Information</h2>
      <form onSubmit={handleUpdate} className="form-box">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={mechanicData.firstname}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastname"
            value={mechanicData.lastname}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={mechanicData.email}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={mechanicData.age}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Mechanic Rating:</label>
          <input
            type="number"
            name="mechanic_rating"
            value={mechanicData.mechanic_rating}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Car Times Repaired:</label>
          <input
            type="number"
            name="car_times_repaired"
            value={mechanicData.car_times_repaired}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Information
        </button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default MechanicUpdatePage;
