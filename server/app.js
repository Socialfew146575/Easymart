require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
const corsOptions = {
  origin: process.env.DEPLOYED_FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify the allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed headers
  credentials: true, // Enable credentials (cookies, authorization headers, etc)
};

app.use(cors(corsOptions));

const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); 
// app.use((req, res, next) => {
//   console.log("Headers:", req.headers);
//   console.log("Cookies:", req.cookies);
//   next();
// });
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
