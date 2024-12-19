import React, { useState } from "react";
import axios from "../api/api";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password_hash: "",
    role: "admin",
    additionalData: {}, // This will hold additional fields for 'driver' and 'mechanic'
  });

  const [registrationType, setRegistrationType] = useState("admin");
  const [responseMessage, setResponseMessage] = useState("");

  // Login state
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // New function to handle changes in additional fields (for 'driver' or 'mechanic')
  const handleAdditionalChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      additionalData: { ...formData.additionalData, [name]: value },
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      let endpoint = `/access/registration/${registrationType}`;
      let payload = {};

      // For 'admin' registration
      if (registrationType === "admin") {
        payload = {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password_hash: formData.password_hash,
          role: "admin",
        };
      } else {
        // For 'driver' or 'mechanic', include additional data
        payload = {
          user_data: {
            firstname: formData.firstname,
            lastname: formData.lastname,
            email: formData.email,
            password_hash: formData.password_hash,
            role: registrationType,
          },
          [`${registrationType}_data`]: {
            ...formData.additionalData, // Spread all additional data
          },
        };
      }

      console.log("Sending POST request to:", endpoint);
      console.log("Request payload:", JSON.stringify(payload, null, 2));

      const response = await axios.post(endpoint, payload);

      console.log("Response received:", response.data);

      setResponseMessage(`Success: ${response.data}`);
    } catch (error) {
      console.error("Error in request:", error);
      setResponseMessage(
        `Error: ${error.response?.data?.detail || "An error occurred"}`
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = "/access/login";
      const payload = {
        email: loginData.email,
        password: loginData.password,  // Use 'password' instead of 'password_hash'
      };
  
      console.log("Sending POST request to:", endpoint);
      console.log("Request payload:", JSON.stringify(payload, null, 2));
  
      const response = await axios.post(endpoint, payload);
  
      console.log("Login response received:", response.data);
  
      // Set logged-in state
      setIsLoggedIn(true);
      setResponseMessage(`Welcome, ${loginData.email}!`);
    } catch (error) {
      console.error("Error during login:", error);
      setResponseMessage(
        `Login failed: ${error.response?.data?.detail || "An error occurred"}`
      );
    }
  };

  const handleLogout = async () => {
    try {
      const endpoint = "/access/logout";
      const response = await axios.post(endpoint);

      console.log("Logout response received:", response.data);
      setIsLoggedIn(false);
      setResponseMessage("Logged out successfully.");
    } catch (error) {
      console.error("Error during logout:", error);
      setResponseMessage("Error during logout.");
    }
  };

  return (
    <div>
      {/* Login Form */}
      <h1>Login</h1>
      {!isLoggedIn ? (
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Logged in successfully!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Registration Form */}
      <h1>Registration</h1>
      <form onSubmit={handleRegistration}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password_hash"
              value={formData.password_hash}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <select
              value={registrationType}
              onChange={(e) => setRegistrationType(e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="mechanic">Mechanic</option>
            </select>
          </label>
        </div>

        {/* Additional fields for driver or mechanic */}
        {registrationType !== "admin" && (
          <>
            <div>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  onChange={handleAdditionalChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Sex:
                <select
                  name="sex"
                  onChange={handleAdditionalChange}
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>
            </div>
            {registrationType === "driver" && (
              <>
                <div>
                  <label>
                    Driver Rating:
                    <input
                      type="number"
                      name="driver_rating"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Driver Rides:
                    <input
                      type="number"
                      name="driver_rides"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Driver Time Accidents:
                    <input
                      type="number"
                      name="driver_time_accidents"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    First Ride Date:
                    <input
                      type="date"
                      name="first_ride_date"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
              </>
            )}
            {registrationType === "mechanic" && (
              <>
                <div>
                  <label>
                    Mechanic Rating:
                    <input
                      type="number"
                      name="mechanic_rating"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Car Times Repaired:
                    <input
                      type="number"
                      name="car_times_repaired"
                      onChange={handleAdditionalChange}
                      required
                    />
                  </label>
                </div>
              </>
            )}
          </>
        )}
        <button type="submit">Register</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
