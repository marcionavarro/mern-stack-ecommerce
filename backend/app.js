import cookieParser from "cookie-parser";
import express from "express";
import fileUpload from "express-fileupload";
import errorHandleMiddleware from "./middleware/error.js";
import order from "./routes/orderRoutes.js";
import payment from "./routes/paymentRoutes.js";
import product from "./routes/productRoutes.js";
import user from "./routes/userRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
// app.use(express.json({ limit: "50mb" })); // "Could not decode base64"
// app.use(express.urlencoded({ limit: "50mb", extended: true })); // "Could not decode base64"
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

//Route
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Server static files
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use(errorHandleMiddleware);

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "backend/config/config.env" });
}

export default app;
