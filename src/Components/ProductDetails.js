import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';

const ProductDetails = ({ products }) => {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return <Typography variant="h6">Product not found</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="body2">Company: {product.company}</Typography>
        <Typography variant="body2">Category: {product.category}</Typography>
        <Typography variant="body2">Price: ${product.price}</Typography>
        <Typography variant="body2">Rating: {product.rating}</Typography>
        <Typography variant="body2">Discount: {product.discount}%</Typography>
        <Typography variant="body2">Availability: {product.availability ? 'In Stock' : 'Out of Stock'}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
