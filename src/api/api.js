import axios from 'axios';

const API_URL = 'http://20.244.56.144/test/companies/:companyname/categories/:categoryname/products?top=n&minPrice=p&maxPrice';

export const fetchProducts = async (category, company, top, minPrice, maxPrice) => {
  try {
    const response = await axios.get(`${API_URL}/companies/${company}/categories/${category}/products`, {
      params: { top, minPrice, maxPrice }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const registerCompany = async () => {
  try {
    const response = await axios.post(`${API_URL}/register`);
    return response.data;
  } catch (error) {
    console.error('Error registering company:', error);
  }
};
