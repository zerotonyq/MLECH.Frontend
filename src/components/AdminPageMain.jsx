import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPageMain = () => {
  const navigate = useNavigate();

  const handleMechanicsClick = () => {
    navigate("/admin-page-mechanics");
  };

  const handleDriversClick = () => {
    navigate("/admin-page-drivers");
  };

  const handleCarsClick = () => {
    navigate("/admin-page-cars");
  };

  const handleFixesClick = () => {
    navigate("/admin-page-fixes");
  };

  const handleRidesClick = () => {
    navigate("/admin-page-rides");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Добро пожаловать!</h1>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleMechanicsClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Перейти на страницу управления механиками
        </button>
        <button
          onClick={handleDriversClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#28A745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Перейти на страницу управления водителями
        </button>
        <button
          onClick={handleCarsClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FFC107",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Перейти на страницу управления машинами
        </button>
        <button
          onClick={handleFixesClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#DC3545", // Красный цвет для кнопки
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Перейти на страницу управления починками
        </button>
        <button
          onClick={handleRidesClick}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#17A2B8", // Голубой цвет для кнопки
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Перейти на страницу управления поездками
        </button>
      </div>
    </div>
  );
};

export default AdminPageMain;
