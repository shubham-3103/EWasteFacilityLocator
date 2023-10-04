// server.js
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Location = require('./src/Components/Location');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define location schema and model
const locationSchema = new mongoose.Schema({
  name: String,
  latitude: Number,
  longitude: Number,
  address: String,
});

const Location = mongoose.model('Location', locationSchema);

// Set up API routes (create, read, update, delete locations)

app.use(express.json());

app.post('/api/locations', (req, res) => {
  const newLocation = new Location(req.body);
  newLocation.save();
  res.json(newLocation);
});

app.get('/api/locations', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
