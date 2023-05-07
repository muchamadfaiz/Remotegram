import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT_SERVER = process.env.PORT_SERVER;

export { MONGODB_URI, PORT_SERVER };