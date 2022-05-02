const mongoose = require('mongoose');
require("dotenv").config();

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_CLOUD_SERVER, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;