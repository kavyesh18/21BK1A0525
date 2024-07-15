import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
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
        <Link to={`/product/${product.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
