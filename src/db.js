import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/shopdb';
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

export const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

export const getDB = () => client.db('shopdb');
