import React from 'react';
import ProductDetails from '../Components/ProductDetails';
import { useLocation } from 'react-router-dom';

const ProductPage = ({ products }) => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  return (
    <div>
      <ProductDetails productId={productId} products={products} />
    </div>
  );
};

export default ProductPage;
