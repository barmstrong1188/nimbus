import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct, fetchProduct } from '../api/api';
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Typography,
  Box,
  useMediaQuery
} from '@mui/material';

const ProductForm = ({ setNotification }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery('(max-width:475px');

  // Load product data if editing
  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        try {
          const response = await fetchProduct(id);
          const product = response.data;
          if (product) {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setQuantity(product.quantity);
          } else {
            setError('Product not found.');
          }
        } catch (err) {
          console.error('Error loading product:', err);
          setError('Failed to load product.');
        }
      }
    };
    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (parseFloat(price) <= 0) {
      setError('Price must be greater than zero.');
      return;
    }
    if (parseInt(quantity) < 0) {
      setError('Quantity cannot be negative.');
      return;
    }
    try {
      if (id) {
        // Update existing product
        await updateProduct(id, { name, description, price, quantity });
        setNotification('Product updated successfully!');
      } else {
        // Add new product
        await addProduct({ name, description, price, quantity });
        setNotification('Product added successfully!');
      }
      navigate('/products');
    } catch (err) {
      console.error('Error saving product:', err);
      setError('Failed to save product. Please try again.');
    }
  };

  return (
    //-------------- main add/edit product content starts here------------
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      left: '35%',
      width: '30%',
      position: 'absolute'
    }}>
      {/*----------------------- add/edit card starts here --------------------*/}
      <Card sx={{
        width: isSmallScreen ? '87vw' : 400,
        p: 2,
        filter: 'drop-shadow(4px 4px 10px rgb(176, 193, 202))',
        boxShadow: 'none'
      }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom
            sx={{ fontFamily: '"Fredoka",serif', color: 'var(--royal-blue)', textAlign: 'center', fontWeight: 550 }}>
            {/*------ If id exists, we're editing a product -------*/}
            {id ? 'EDIT PRODUCT' : 'ADD PRODUCT'}
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {/* -------add/edit product form text fields start here------------ */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              inputProps={{ step: '0.01' }}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
              required
            />
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--royal-blue)',
                    transition: '.33s'
                  },
                }
              }}
              required
            />
            {/*-------------------- save product button -------------------*/}
            <CardActions sx={{ mt: 2 }}>
              <Button aria-label="Save product" type="submit" variant="contained" className="add-product-button" fullWidth
                sx={{
                  fontFamily: '"Montserrat", serif',
                  backgroundSize: '600%',
                  backgroundPositionX: 'left',
                  background: 'linear-gradient(-105deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 46%, rgba(26,124,228,1) 90%);',
                  '&:hover': {
                    backgroundPosition: 'right'
                  }
                }}>
                {/*------ If id exists, we're editing a product -------*/}
                {id ? 'Update Product' : 'Add Product'}
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductForm;
