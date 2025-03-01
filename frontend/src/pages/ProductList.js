import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../api/api';
import { useNavigate, useLocation } from 'react-router-dom';

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
            // Reload the products after deletion
            loadProducts();
        } catch (err) {
            console.error('Error deleting product', err);
            setError('Failed to delete product.');
        }
    };

    return (
        <div>
            <h1>Product Inventory</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {products.length === 0 ? (
                <p>No products in inventory.</p>
            ) : (
                <ul>
                    {products.map((product) => {
                        return (
                            <li key={product.id}>
                            <strong>{product.name}</strong> - ${product.price} | Qty: {product.quantity}
                            <button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                        );     
                    })}
                </ul>
            )}
        </div>     
    );
};

export default ProductList;