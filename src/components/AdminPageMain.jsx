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
    navigate("/admin-page-cars"); // Путь для страницы управления машинами
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
          onClick={handleCarsClick} // Обработчик для страницы машин
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#FFC107", // Желтый цвет для кнопки
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Перейти на страницу управления машинами
        </button>
      </div>
    </div>
  );
};

export default AdminPageMain;
