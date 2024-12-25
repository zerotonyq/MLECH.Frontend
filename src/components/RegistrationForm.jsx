import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/api";
import "../styles.css";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password_hash: "",
    role: "admin",
    additionalData: {
      age: 0,
      sex: "male",
      driver_rating: 0,
      driver_rides: 0,
      driver_time_accidents: 0,
      first_ride_date: "",
      mechanic_rating: 0,
      car_times_repaired: 0,
    },
  });

  const [registrationType, setRegistrationType] = useState("admin");
  const [responseMessage, setResponseMessage] = useState("");
  const [userRole, setUserRole] = useState(""); // Новое состояние для роли пользователя


  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState("registration");

  // const navigate = useNavigate(); // to handle redirection after login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      additionalData: { ...formData.additionalData, [name]: value },
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "/access/login";
      const payload = {
        email: loginData.email,
        password: loginData.password,
      };

      const response = await axios.post(endpoint, payload, {
        timeout: 3000, // Таймаут в миллисекундах
      });
      setIsLoggedIn(true);
      setResponseMessage(`Welcome, ${loginData.email}!`);
      setUserRole(response.data.role); // Сохранение роли пользователя

      console.log("Role: ", response.data.role);

      // Используйте переменную navigate, созданную выше
      if (response.data.role === "UserRoleEnum.MECHANIC") {
        navigate("/mechanic-update"); // Переход на страницу для механика
      } 
      else if (response.data.role === "UserRoleEnum.DRIVER") {
        navigate("/driver-update");
      }
      else if (response.data.role === "UserRoleEnum.ADMIN") {
        navigate("/admin-page-main");
      } else {
        navigate("/"); // Переход на общую панель
      }
    } catch (error) {
      setResponseMessage(`Login failed: ${error.response?.data?.detail || "An error occurred"}`);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (!formData.firstname || !formData.lastname || !formData.email || !formData.password_hash) {
      return setResponseMessage("All fields are required!");
    }
    if (registrationType !== "admin" && !formData.additionalData.age) {
      return setResponseMessage("Age is required for drivers and mechanics!");
    }

    try {
      const endpoint = `/access/registration/${registrationType}`;
      let payload = {};

      if (registrationType === "admin") {
        payload = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password_hash: formData.password_hash,
          role: "admin",
        };
      } else {
        payload = {
          user_data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password_hash: formData.password_hash,
            role: registrationType,
          },
          [`${registrationType}_data`]: {
            ...(registrationType === "driver"
              ? {
                  age: formData.additionalData.age,
                  sex: formData.additionalData.sex,
                  driver_rating: formData.additionalData.driver_rating,
                  driver_rides: formData.additionalData.driver_rides,
                  driver_time_accidents: formData.additionalData.driver_time_accidents,
                  first_ride_date: formData.additionalData.first_ride_date || new Date().toISOString().split('T')[0],
                  first_ride_date: formData.additionalData.first_ride_date,
                }
              : {
                  age: formData.additionalData.age,
                  sex: formData.additionalData.sex,
                  mechanic_rating: formData.additionalData.mechanic_rating,
                  car_times_repaired: formData.additionalData.car_times_repaired,
                }),
          },
        };
      }

      const response = await axios.post(endpoint, payload, {
        timeout: 3000, // Таймаут в миллисекундах
      });
      setResponseMessage(`Success: ${response.data}`);
    } catch (error) {
      if (error.response?.status === 409) {
        // Conflict error (e.g., user already exists)
        setResponseMessage(`Error: User already exists.`);
      } else {
        setResponseMessage(
          `Error: ${error.response?.data?.detail || error.message || "An unknown error occurred"}`
        );
      }
    }
  };

  const handleLogout = () => {
    setUserRole(""); // Сброс роли при выходе
    setIsLoggedIn(false);
    setCurrentView("registration");
    setResponseMessage("Logged out successfully.");
  };

  return (
    <div className="container vibrant">
      <header className="header">
        <h1>Driver Portal</h1>
        <p>Your one-stop solution for driver and admin management</p>
      </header>

      {!isLoggedIn ? (
        <form onSubmit={handleLogin} className="form-box login-box shadow">
          <h2>Login</h2>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {responseMessage && <p className="error-message">{responseMessage}</p>}
        </form>
      ) : (
        <div className="dashboard">
          <p className="welcome-message">{responseMessage}</p>
          <p className="role-display">Your role: <strong>{userRole}</strong></p>
          <div className="button-group">
            <button
              className={`btn ${currentView === "registration" ? "btn-active" : "btn-secondary"}`}
              onClick={() => setCurrentView("registration")}
            >
              Registration
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      {currentView === "registration" && (
        <form onSubmit={handleRegistration} className="form-box registration-box shadow">
          <h2>Registration</h2>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
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
              value={formData.lastname}
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
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password_hash"
              value={formData.password_hash}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Role:</label>
            <select
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value)}
              className="form-control"
            >
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </div>

          {registrationType !== "admin" && (
            <>
              <div className="form-group">
                <label>Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.additionalData.age}
                  onChange={handleAdditionalChange}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Sex:</label>
                <select
                  name="sex"
                  value={formData.additionalData.sex}
                  onChange={handleAdditionalChange}
                  required
                  className="form-control"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {registrationType === "driver" && (
              <>
                <div className="form-group">
                  <label>Driver Rating:</label>
                  <input
                    type="number"
                    name="driver_rating"
                    value={formData.additionalData.driver_rating}
                    onChange={handleAdditionalChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Rides:</label>
                  <input
                    type="number"
                    name="driver_rides"
                    value={formData.additionalData.driver_rides}
                    onChange={handleAdditionalChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Number of Accidents:</label>
                  <input
                    type="number"
                    name="driver_time_accidents"
                    value={formData.additionalData.driver_time_accidents}
                    onChange={handleAdditionalChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>First Ride Date:</label>
                  <input
                    type="date"
                    name="first_ride_date"
                    value={formData.additionalData.first_ride_date}
                    onChange={handleAdditionalChange}
                    className="form-control"
                  />
                </div>
              </>
            )}

              {registrationType === "mechanic" && (
                <>
                  <div className="form-group">
                    <label>Mechanic Rating:</label>
                    <input
                      type="number"
                      name="mechanic_rating"
                      value={formData.additionalData.mechanic_rating}
                      onChange={handleAdditionalChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Car Times Repaired:</label>
                    <input
                      type="number"
                      name="car_times_repaired"
                      value={formData.additionalData.car_times_repaired}
                      onChange={handleAdditionalChange}
                      className="form-control"
                    />
                  </div>
                </>
              )}
            </>
          )}

          <button type="submit" className="btn btn-primary">
            Register
          </button>

          {responseMessage && <p className="error-message">{responseMessage}</p>}
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
