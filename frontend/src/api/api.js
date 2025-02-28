import axios from 'axios';

// Create an Axios instance with base URL
const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// Request interceptor to add JWT to headers
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// API calls for authentication
export const loginUser = async (credentials) => {
    return apiClient.post('/auth/login', credentials);
};

export const signupUser = async (userData) => {
    return apiClient.post('/auth/signup', userData);
};

// API calls for products
export const fetchProducts = async () => {
    return apiClient.get('/products');
};

export const addProduct = async (productData) => {
    return apiClient.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
    return apiClient.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
    return apiClient.delete(`/products/${id}`);
};
