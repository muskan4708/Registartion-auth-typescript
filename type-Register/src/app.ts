import express from 'express';
import userRoutes from "./routes/userRoutes"
import cors from 'cors'
const app = express();

// Middleware
app.use(express.json());

app.use(cors())
// Routes
app.use('/api/user', userRoutes);

export default app;
