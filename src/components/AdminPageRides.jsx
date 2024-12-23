import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Стили в формате CSS-in-JS
const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333', // Здесь устанавливается темный цвет текста для всего контейнера
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      fontSize: '16px',
      cursor: 'pointer',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
    },
    input: {
      padding: '8px',
      margin: '10px',
      fontSize: '16px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    error: {
      color: 'red',
      fontSize: '14px',
    },
    rideDetails: {
      padding: '20px',
      marginTop: '20px',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    rideItem: {
      padding: '10px',
      borderBottom: '1px solid #ddd',
    },
    rideList: {
      listStyleType: 'none',
      padding: '0',
    },
    rideRow: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '5px 0',
    },
    rideKey: {
      fontWeight: 'bold',
      minWidth: '150px',
      color: '#333', // Цвет ключа (например, "Ride ID")
    },
    rideValue: {
      flex: 1,
      color: '#333', // Цвет значения (например, "12345")
    },
  };
  

const AdminPageRides = () => {
  const [rides, setRides] = useState([]);
  const [rideId, setRideId] = useState('');
  const [rideData, setRideData] = useState({
    driver_id: '',
    car_id: '',
    rating: '',
    ride_date: '',
    ride_duration: '',
    ride_cost: '',
    speed_avg: '',
    speed_max: '',
    stop_times: '',
    distance: '',
    refueling: '',
    user_ride_quality: '',
    deviation_normal: '',
  });
  const [error, setError] = useState('');
  const [rideInfo, setRideInfo] = useState(null);

  useEffect(() => {
    fetchRides();
  }, []);

  const fetchRides = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/rides/get_all');
      setRides(response.data);
    } catch (err) {
      setError('Error fetching rides');
    }
  };

  const addRide = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/rides/add', {
        ride_data: {
          driver_id: rideData.driver_id,
          car_id: rideData.car_id,
          rating: rideData.rating,
        },
        ride_info_data: {
          ride_date: rideData.ride_date,
          ride_duration: rideData.ride_duration,
          ride_cost: rideData.ride_cost,
          speed_avg: rideData.speed_avg,
          speed_max: rideData.speed_max,
          stop_times: rideData.stop_times,
          distance: rideData.distance,
          refueling: rideData.refueling,
          user_ride_quality: rideData.user_ride_quality,
          deviation_normal: rideData.deviation_normal,
        },
      });
      setError('');
      fetchRides(); // Refresh ride list
    } catch (err) {
      setError('Error adding ride');
    }
  };

  const fetchRideById = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/rides/get_by_id/${rideId}`);
      setRideInfo(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching ride by ID');
      setRideInfo(null);
    }
  };

  const deleteRide = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/rides/delete/${id}`);
      fetchRides(); // Refresh ride list after deletion
      setError('');
    } catch (err) {
      setError('Error deleting ride');
    }
  };

  const updateRide = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/rides/update/${id}`, {
        ride_data: {
          rating: rideData.rating,
        },
        ride_info_data: {
          ride_date: rideData.ride_date,
          ride_duration: rideData.ride_duration,
          ride_cost: rideData.ride_cost,
          speed_avg: rideData.speed_avg,
          speed_max: rideData.speed_max,
          stop_times: rideData.stop_times,
          distance: rideData.distance,
          refueling: rideData.refueling,
          user_ride_quality: rideData.user_ride_quality,
          deviation_normal: rideData.deviation_normal,
        },
      });
      fetchRides(); // Refresh ride list after update
      setError('');
    } catch (err) {
      setError('Error updating ride');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Admin Page for Managing Rides</h1>

      {/* Button to fetch all rides */}
      <button style={styles.button} onClick={fetchRides}>Get All Rides</button>

      {/* Button to add new ride */}
      <h3>Add New Ride</h3>
      <div>
        <input
          style={styles.input}
          type="number"
          placeholder="Driver ID"
          value={rideData.driver_id}
          onChange={(e) => setRideData({ ...rideData, driver_id: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Car ID"
          value={rideData.car_id}
          onChange={(e) => setRideData({ ...rideData, car_id: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Rating"
          value={rideData.rating}
          onChange={(e) => setRideData({ ...rideData, rating: e.target.value })}
        />
        <input
          style={styles.input}
          type="text"
          placeholder="Ride Date"
          value={rideData.ride_date}
          onChange={(e) => setRideData({ ...rideData, ride_date: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Ride Duration"
          value={rideData.ride_duration}
          onChange={(e) => setRideData({ ...rideData, ride_duration: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Ride Cost"
          value={rideData.ride_cost}
          onChange={(e) => setRideData({ ...rideData, ride_cost: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Speed Average"
          value={rideData.speed_avg}
          onChange={(e) => setRideData({ ...rideData, speed_avg: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Speed Max"
          value={rideData.speed_max}
          onChange={(e) => setRideData({ ...rideData, speed_max: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Stop Times"
          value={rideData.stop_times}
          onChange={(e) => setRideData({ ...rideData, stop_times: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Distance"
          value={rideData.distance}
          onChange={(e) => setRideData({ ...rideData, distance: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Refueling"
          value={rideData.refueling}
          onChange={(e) => setRideData({ ...rideData, refueling: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="User Ride Quality"
          value={rideData.user_ride_quality}
          onChange={(e) => setRideData({ ...rideData, user_ride_quality: e.target.value })}
        />
        <input
          style={styles.input}
          type="number"
          placeholder="Deviation Normal"
          value={rideData.deviation_normal}
          onChange={(e) => setRideData({ ...rideData, deviation_normal: e.target.value })}
        />
        <button style={styles.button} onClick={addRide}>Add Ride</button>
      </div>

      {/* Input for fetching ride by ID */}
      <h3>Get Ride by ID</h3>
      <input
        style={styles.input}
        type="number"
        placeholder="Enter Ride ID"
        value={rideId}
        onChange={(e) => setRideId(e.target.value)}
      />
      <button style={styles.button} onClick={fetchRideById}>Get Ride Info</button>

      {/* Error message */}
      {error && <div style={styles.error}>{error}</div>}

      {/* Display Ride Information in a styled table format */}
      {rideInfo && (
        <div style={styles.rideDetails}>
          <h4>Ride Details</h4>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Ride ID:</span>
            <span style={styles.rideValue}>{rideInfo.ride_id}</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Driver ID:</span>
            <span style={styles.rideValue}>{rideInfo.driver_id}</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Car ID:</span>
            <span style={styles.rideValue}>{rideInfo.car_id}</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Rating:</span>
            <span style={styles.rideValue}>{rideInfo.rating}</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Ride Date:</span>
            <span style={styles.rideValue}>{rideInfo.ride_date}</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Ride Duration:</span>
            <span style={styles.rideValue}>{rideInfo.ride_duration} mins</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Ride Cost:</span>
            <span style={styles.rideValue}>{rideInfo.ride_cost} ₽</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Speed Average:</span>
            <span style={styles.rideValue}>{rideInfo.speed_avg} km/h</span>
          </div>
          <div style={styles.rideRow}>
            <span style={styles.rideKey}>Speed Max:</span>
            <span style={styles.rideValue}>{rideInfo.speed_max} km/h</span>
          </div>
          {/* More fields can be added here */}
        </div>
      )}

      {/* Display the list of all rides */}
      <h3>All Rides</h3>
      <ul style={styles.rideList}>
        {rides.map((ride) => (
          <li key={ride.ride_id} style={styles.rideItem}>
            Ride ID: {ride.ride_id}, Driver ID: {ride.driver_id}, Car ID: {ride.car_id}, Date: {ride.ride_date}
            <button style={styles.button} onClick={() => deleteRide(ride.ride_id)}>Delete</button>
            <button style={styles.button} onClick={() => updateRide(ride.ride_id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPageRides;
