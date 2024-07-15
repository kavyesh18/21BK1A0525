import React, { useState, useEffect } from 'react';
import { fetchProducts, registerCompany } from '../api/api';
import ProductCard from '../Components/ProductCard';
import { TextField, MenuItem, Button, Grid, Typography, Pagination } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterOption, setFilterOption] = useState({ rating: 0, minPrice: 0, maxPrice: Infinity, availability: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const registerAndFetchProducts = async () => {
      await registerCompany();
      const data = await fetchProducts(category, company);
      setProducts(data);
    };

    registerAndFetchProducts();
  }, [category, company]);

  const handleSort = (option) => {
    const sortedProducts = [...products].sort((a, b) => a[option] - b[option]);
    setProducts(sortedProducts);
    setSortOption(option);
  };

  const handleFilter = () => {
    const filteredProducts = products.filter(product => {
      return (
        product.rating >= filterOption.rating &&
        product.price >= filterOption.minPrice &&
        product.price <= filterOption.maxPrice &&
        (filterOption.availability ? product.availability === filterOption.availability : true)
      );
    });
    setProducts(filteredProducts);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const displayedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Min Rating"
          type="number"
          value={filterOption.rating}
          onChange={(e) => setFilterOption({ ...filterOption, rating: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Min Price"
          type="number"
          value={filterOption.minPrice}
          onChange={(e) => setFilterOption({ ...filterOption, minPrice: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Max Price"
          type="number"
          value={filterOption.maxPrice}
          onChange={(e) => setFilterOption({ ...filterOption, maxPrice: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Availability"
          select
          value={filterOption.availability}
          onChange={(e) => setFilterOption({ ...filterOption, availability: e.target.value })}
          style={{ marginRight: '10px' }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="In Stock">In Stock</MenuItem>
          <MenuItem value="Out of Stock">Out of Stock</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleFilter}>Filter</Button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          select
          label="Sort By"
          value={sortOption}
          onChange={(e) => handleSort(e.target.value)}
        >
          <MenuItem value="price">Price</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
          <MenuItem value="discount">Discount</MenuItem>
        </TextField>
      </div>
      <Grid container spacing={3}>
        {displayedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(products.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
      />
    </div>
  );
};

export default AllProducts;
