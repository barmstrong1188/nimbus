import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct, fetchProduct } from '../api/api';

const ProductForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');

    // If editing, load the product data
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
                    console.error('Error loading product: ', err);
                    setError('Failed to load product.');
                }
            }
        };
        loadProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        //Basic validation
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
            } else {
                // Add new product
                await addProduct({ name, description, price, quantity });
            }
            navigate('/products');
        } catch (err) {
            console.error('Error saving product', err);
            setError('Failed to save product. Please try again.');
        }
    };

    return (
        <div>
            <h1>{id ? 'Edit Product' : 'Add Product'}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required></input>
                </div>
                <div>
                    <label>Description:</label>
                    <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label>Price:</label>
                    <input
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required></input>
                </div>
                <div>
                    <label>Quantity:</label>
                    <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required></input>
                </div>
                <button>{id ? 'Update Product' : 'Add Product'}</button>
            </form>
        </div>
    );
};

export default ProductForm;