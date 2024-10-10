require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cors = require("cors")
const cookie_parser = require('cookie-parser')
const bodyParser = require("body-parser")
const corsOptions = {
  origin: [
    process.env.DEPLOYED_FRONTEND_URL || "http://localhost:3000", // Fallback for development
    process.env.LOCAL_FRONTEND_URL || "http://localhost:3000", // Fallback for local
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookie_parser());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
// Product Route
const productRouter = require("./routes/productRoute");

//User Route
const userRouter = require("./routes/userRoute");

// Order Route
const orderRouter = require("./routes/orderRoute")

// Payment Route

const paymentRoute = require("./routes/paymentRoute")

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1",orderRouter)
app.use("/api/v1",paymentRoute)

// Error Middleware

app.use(errorMiddleware);

module.exports = { app };
