
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");
const post = require("./routes/products");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/", post);

app.listen(process.env.PORT, async () => {
    try {
        await connect;
        console.log(`Listening at http://localhost:${process.env.PORT}`)
    } catch (error) {
        console.log(error);
    }
})