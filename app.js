const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const connectDB = async() => {
  const DATABASE_URL = require('./config').DATABASE_URL;

  try{
    await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Successfully connected to MongoDB..");
  }catch(err){
    console.log("Something went wrong when trying to connect to MongoDB...\n");
    console.error(err.message);
    process.exit(1);
  }
}

connectDB();

app.use(express.static("static"));

app.use(express.json({extended: false}));

app.use('/', require('./routes/index.js'));
app.use('/api', require('./routes/api.js'));

app.listen(PORT, HOST);
console.log(`Server is running on port ${HOST}:${PORT}...`);
