const express = require('express');
const app = express();
const mongoose = require('mongoose');

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
app.use(express.json())

// Mongo Db Connection
mongoose
    .connect(process.env.MONGO_CLOUD_SERVER, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MONGO DB CONNECTED"))
    .catch((err) => console.log("Connection Error" + err));



app.get('/', (req, res) => {
    res.send("Welcome Manjit")
});

// Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'))




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`APP IS RUNNING AT ${PORT}`));