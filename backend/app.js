const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const expressValidator = require("express-validator");

require("dotenv").config();

//import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const braintreeRoutes = require("./routes/braintree");
const orderRoutes = require("./routes/order");

//app
const app = express();

//db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log("DB connected"));

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json()); //get json data from request body
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());


// route middleware

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", braintreeRoutes);
app.use("/api", orderRoutes);

const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`server is runnong on prot ${port}`);
});