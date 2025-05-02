import express from "express";
import dotenv from "dotenv"; 
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';



//configure env
dotenv.config();

//database config
connectDB();
 
// rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/feedback", feedbackRoutes);

//rest api
app.get("/", (req, res) => {
    res.send("<h1>Welcome to feedback app</h1>");
});

//Port
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`);
}) 