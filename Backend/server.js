// server.js
const express = require('express');
const mongoose = require('mongoose');
const Location = require('./Models/Location')
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

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

//Location

app.post('/location', async function(req,res){
  try {
    if(
      !req.body.name ||
      !req.body.latitude ||
      !req.body.longitude 
    ){
      return res.status(400).send({
        message:'Send all required fields'
      });
    }
    const newLocation = {
      name:req.body.name,
      latitude:req.body.latitude,
      longitude:req.body.longitude,
    }
    const location = await Location.create(newLocation)
    return res.status(201).send(location);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message})
  }
})
//fetch all location
app.get('/location', async function(req,res){
  try {
    const location = await Location.find({});
    return res.status(200).json(location);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message})
  }
})
//fetch location by id
app.get('/location/:id', async function(req,res){
  try {
    const {id} = req.params;
    const location = await Location.findById(id);
    return res.status(200).json(location);
  } catch (error) {
      console.log(error.message);
      res.status(500).send({message: error.message})
  }
})


// Define location schema and model
// const locationSchema = new mongoose.Schema({
//   name: String,
//   latitude: Number,
//   longitude: Number
// });

// const Location = mongoose.model('Location', locationSchema);



// Set up API routes (create, read, update, delete locations)

// app.use(express.json());

// app.post('/api/locations', (req, res) => {
//   const newLocation = new Location(req.body);
//   newLocation.save();
//   res.json(newLocation);
// });

// app.get('/api/locations', async (req, res) => {
//   const locations = await Location.find();
//   res.json(locations);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
