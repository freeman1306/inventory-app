import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadProducts } from './store/productsSlice';
import NavigationMenu from './components/NavigationMenu';
import TopMenu from './components/TopMenu';
import Orders from './pages/Orders';
import Products from './pages/Products';
import InstallPWA from './components/InstallPWA';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

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
        <InstallPWA />
      </BrowserRouter>
  );
}

export default App;