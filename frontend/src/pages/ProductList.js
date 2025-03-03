import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProductList = ({ setNotification }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      console.log('Fetched products:', response.data);
      setProducts(response.data);
    } catch (err) {
      console.error('Error loading products', err);
      setError('Failed to load products.');
    }
  };

  useEffect(() => {
    loadProducts();
  }, [location]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setNotification('Product deleted successfully!');
      loadProducts();
    } catch (err) {
      console.error('Error deleting product', err);
      setError('Failed to delete product.');
    }
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150, sortable: true },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 250 },
    { field: 'price', headerName: 'Price', flex: 0.6, minWidth: 100, renderCell: (params) => `$${params.value}`, sortable: true },
    { field: 'quantity', headerName: 'Quantity', flex: 0.6, minWidth: 100, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 150,
      align: 'right',
      headerAlign: 'right',
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            aria-label="Edit product"
            variant="contained"
            size="small"
            onClick={() => navigate(`/edit-product/${params.row.id}`)}
          >
            <EditIcon />
          </Button>
          <Button
            aria-label="Delete product"
            variant="contained"
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
            sx={{ ml: 1 }}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      ),
    },
  ];

  return (
    //-------------------- product inventory table starts here-------------------
    <div style={{ position: 'absolute', height: '80vh', width: '75%', maxWidth: '1500px', left: '50%', transform: 'translateX(-50%)' }}>
      <h1 style={{ color: 'var(--royal-blue)', fontFamily: '"Montserrat",serif', fontWeight: '450' }}>Product Inventory</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          '--DataGrid-containerBackground': 'linear-gradient(200deg, rgba(21,212,209,1) 0%, rgba(14,195,250,1) 10%, rgba(26,124,228,1) 90%);',
          '& [role="row"]:last-of-type .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          boxShadow: '0px 0px 10px rgba(109, 179, 201, 0.45)',
          fontFamily: '"Montserrat", serif',
          '& .MuiDataGrid-columnHeaders': {
            color: '#fff',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontFamily: '"Montserrat", serif',
            fontWeight: 600,
          },
          '& .MuiTablePagination-selectLabel': {
            fontFamily: '"Montserrat", serif'
          },
          '& .MuiTablePagination-input': {
            fontFamily: '"Montserrat", serif'
          },
          '& .MuiTablePagination-displayedRows': {
            fontFamily: '"Montserrat", serif'
          }
        }}
      />
    </div>
  );
};

export default ProductList;