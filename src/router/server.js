import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const EXTERNAL_API_BASE_URL = 'https://fakestoreapi.com/products';

app.get('/api/products', async (req, res) => {
    try {
        const response = await axios.get(`${EXTERNAL_API_BASE_URL}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const response = await axios.get(`${EXTERNAL_API_BASE_URL}/${productId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

let orders = []; // Temporär lagringsmetod, använd DB senare

app.get('/api/orders', (req, res) => {
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
    const newOrder = req.body;
    newOrder.id = orders.length + 1;
    orders.push(newOrder);
    res.status(201).json(newOrder);
});

app.put('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const updatedOrder = req.body;

    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex] = updatedOrder;
        res.json(updatedOrder);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

app.put('/api/orders/:id/cancel', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(order => order.id === orderId);

    if (order) {
        order.orderCancelled = true;
        res.json(order);
    } else {
        res.status(404).json({ error: 'Order not found' });
    }
});

app.delete('/api/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    orders = orders.filter(order => order.id !== orderId);
    res.status(204).send();
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
