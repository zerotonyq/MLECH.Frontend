import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем react-dom/client
import App from './App';
import './styles.css'; // Подключение стилей, если необходимо

// Создаём корневой элемент для рендеринга
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендерим приложение с React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
