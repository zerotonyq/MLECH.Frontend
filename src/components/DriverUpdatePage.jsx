import React, { useState, useEffect } from "react";
import axios from "../api/api";
import { useNavigate } from "react-router-dom";

const DriverUpdatePage = () => {
  const [driverData, setDriverData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: 0,
    driver_rating: 0,
    driver_rides: 0,
    driver_time_accidents: 0,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Ideally, fetch driver data from the server or use the current logged-in user's data
    // This could be fetched via an API call
    // For example:
    // axios.get('/drivers/profile')
    //   .then(response => setDriverData(response.data))
    //   .catch(error => console.log(error));

    // For now, you can assume the data is available as an object
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData({ ...driverData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "/drivers/update";
      const payload = {
        user_data: {
          firstname: driverData.firstname,
          lastname: driverData.lastname,
          email: driverData.email,
        },
        driver_data: {
          age: driverData.age,
          driver_rating: driverData.driver_rating,
          driver_rides: driverData.driver_rides,
          driver_time_accidents: driverData.driver_time_accidents,
        },
      };

      const response = await axios.put(endpoint, payload);
      setResponseMessage("Driver information updated successfully.");
      navigate("/dashboard"); // Redirect back to the dashboard after success
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  return (
    <div className="container">
      <h2>Update Driver Information</h2>
      <form onSubmit={handleUpdate} className="form-box">
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstname"
            value={driverData.firstname}
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
            value={driverData.lastname}
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
            value={driverData.email}
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
            value={driverData.age}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Driver Rating:</label>
          <input
            type="number"
            name="driver_rating"
            value={driverData.driver_rating}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Driver Rides:</label>
          <input
            type="number"
            name="driver_rides"
            value={driverData.driver_rides}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Driver Time Accidents:</label>
          <input
            type="number"
            name="driver_time_accidents"
            value={driverData.driver_time_accidents}
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

export default DriverUpdatePage;