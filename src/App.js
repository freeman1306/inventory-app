import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavigationMenu from './components/NavigationMenu';
import TopMenu from './components/TopMenu';
import Orders from './pages/Orders';
import Products from './pages/Products';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <NavigationMenu />
          </div>
          <div className="col-10">
            <TopMenu />
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
