import React from 'react';
import { Link } from 'react-router-dom';

function NavigationMenu() {
  return (
    <div className="bg-dark vh-100 p-3">
      <h4 className="text-white">INVENTORY</h4>
      <nav className="nav flex-column">
        <Link to="/" className="nav-link text-white">
          ПРИХОД
        </Link>
        <Link to="/products" className="nav-link text-white">
          ПРОДУКТЫ
        </Link>
        <span className="nav-link text-secondary">ГРУППЫ</span>
        <span className="nav-link text-secondary">ПОЛЬЗОВАТЕЛИ</span>
        <span className="nav-link text-secondary">НАСТРОЙКИ</span>
      </nav>
    </div>
  );
}

export default NavigationMenu;
