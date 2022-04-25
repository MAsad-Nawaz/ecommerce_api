const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const stripeRouter = require('./routes/stripe');
const cors = require("cors");




//Bodyparser Middleware
app.use(express.json());


//DB Config
dotenv.config();

// connect to Mongo
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        //useCreateIndex: true,
    })
    .then(() => console.log('Mongo DB connect.'))
    .catch(err => console.log(err));

app.use(cors());

//Use Routes
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/checkout", stripeRouter);





const port = process.env.PORT || 5000;

app.listen(port || 5000, () => {
    console.log("first")
});