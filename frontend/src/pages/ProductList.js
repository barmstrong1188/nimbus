import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
const ProductList = () => {
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
      loadProducts();
    } catch (err) {
      console.error('Error deleting product', err);
      setError('Failed to delete product.');
    }
  };

  // Define columns for the DataGrid
  const columns = [
    // { field: 'id', headerName: 'ID', width: 70, sortable: true },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 145, sortable: true },
    { field: 'price', headerName: 'Price', flex: 1, minWidth: 100, renderCell: (params) => `$${params.value}`,sortable: true },
    { field: 'quantity', headerName: 'Quantity', flex: 1, minWidth: 50, sortable: true },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 175,
      align: 'right',
      headerAlign: 'right',
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/edit-product/${params.row.id}`)}
          >
            <EditIcon />
          </Button>
          <Button
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
    <div style={{ height: 500, width: '69%', position: 'fixed' , left: '17%'}}>
      <h1 style={{color: 'var(--royal-blue)', fontFamily: '"Montserrat",serif', fontWeight:'450'}}>Product Inventory</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        disableSelectionOnClick
        sx={{
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
          '& .MuiTablePagination-selectLabel' : {
            fontFamily: '"Montserrat", serif'
          },
          '& .MuiTablePagination-input'  : {
            fontFamily: '"Montserrat", serif'
          },
          '& .MuiTablePagination-displayedRows'  : {
            fontFamily: '"Montserrat", serif'
          }
        }}
      />
    </div>
  );
};

export default ProductList;