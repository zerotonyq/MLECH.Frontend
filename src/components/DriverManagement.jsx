import React, { useState } from "react";
import axios from "../api/api";
import "../styles.css";

const DriverManagement = () => {
  const [driverId, setDriverId] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (e) => {
    setDriverId(e.target.value);
  };

  const getAllDrivers = async () => {
    try {
      const response = await axios.get("/drivers/get_all");
      setDrivers(response.data);
      setResponseMessage("Fetched all drivers successfully.");
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const getDriverById = async () => {
    try {
      const response = await axios.get(`/drivers/get_by_id/${driverId}`);
      setResponseMessage(`Driver Info: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const getDriverRides = async () => {
    try {
      const response = await axios.get(`/drivers/get_rides/${driverId}`);
      setResponseMessage(`Driver Rides: ${JSON.stringify(response.data)}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const deleteSelf = async () => {
    try {
      const response = await axios.delete("/drivers/delete");
      setResponseMessage(`Driver deleted: ${response.data}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const deleteDriverById = async () => {
    try {
      const response = await axios.delete(`/drivers/delete_by_id/${driverId}`);
      setResponseMessage(`Driver with ID ${driverId} deleted: ${response.data}`);
    } catch (error) {
      setResponseMessage(`Error: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const updateSelf = async () => {
    setResponseMessage("Self-update endpoint not yet implemented.");
  };

  const updateDriverById = async () => {
    setResponseMessage("Update-by-ID endpoint not yet implemented.");
  };

  return (
    <div className="container vibrant">
      <header className="header">
        <h1>Driver Management</h1>
        <p>Manage all driver-related tasks with ease.</p>
      </header>

      <div className="actions shadow">
        <button className="btn btn-primary" onClick={getAllDrivers}>
          Get All Drivers
        </button>
      </div>

      <div className="driver-list">
        {drivers.length > 0 && <h3 className="section-title">All Drivers</h3>}
        {drivers.map((driver) => (
          <div key={driver.id} className="driver-card shadow">
            <p><strong>ID:</strong> {driver.id}</p>
            <p><strong>Name:</strong> {driver.name || "N/A"}</p>
            <p><strong>Details:</strong> {JSON.stringify(driver)}</p>
          </div>
        ))}
      </div>

      <div className="form-box shadow">
        <h3>Driver-Specific Actions</h3>
        <div className="form-group">
          <label>Driver ID:</label>
          <input
            type="text"
            value={driverId}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>
        <div className="button-group">
          <button className="btn btn-info" onClick={getDriverById}>
            Get Driver by ID
          </button>
          <button className="btn btn-info" onClick={getDriverRides}>
            Get Driver Rides
          </button>
          <button className="btn btn-danger" onClick={deleteSelf}>
            Delete Myself
          </button>
          <button className="btn btn-danger" onClick={deleteDriverById}>
            Delete by ID
          </button>
          <button className="btn btn-success" onClick={updateSelf}>
            Update Myself
          </button>
          <button className="btn btn-success" onClick={updateDriverById}>
            Update by ID
          </button>
        </div>
      </div>

      {responseMessage && <div className="alert alert-info">{responseMessage}</div>}
    </div>
  );
};

export default DriverManagement;
