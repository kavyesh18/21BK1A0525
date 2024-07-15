import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AllProducts from './Components/AllProducts';
import ProductPage from './Components/ProductPage';
import { fetchProducts, registerCompany } from './api/api';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      await registerCompany();
      const initialProducts = await fetchProducts();
      setProducts(initialProducts);
    };

    fetchInitialProducts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AllProducts />} />
        <Route path="/product/:productId" element={<ProductPage products={products} />} />
      </Routes>
    </Router>
  );
};

export default App;
