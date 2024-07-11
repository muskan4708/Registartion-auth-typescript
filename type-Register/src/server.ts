import express from  'express'
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes"
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 5000;
import cors from 'cors'
// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/api/user', userRoutes);

// Database connection
const MONGO_URI = "mongodb+srv://muskan4708:muskan123@cluster0.6pgkumg.mongodb.net/mydatabase?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI
  )
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err: string) => console.error("MongoDB connection error:", err));

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });