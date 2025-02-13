import express from "express";
import product from "./routes/ProductRoutes.js";

const app = express();

// Middleware
app.use(express.json())

//Route
app.use("/api/v1", product);

export default app;
