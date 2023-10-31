const express = require('express');
const router = express.Router();
const Location = require('../Models/Location')

router.post('/', async function(req,res){
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
router.get('/', async function(req,res){
    try {
      const location = await Location.find({});
      return res.status(200).json(location);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

  //fetch location by id
router.get('/:id', async function(req,res){
    try {
      const {id} = req.params;
      const location = await Location.findById(id);
      return res.status(200).json(location);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})
router.put('/:id', async function(req,res){
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
  
      const { id } = req.params;
      const result = await Location.findByIdAndUpdate(id,req.body);
      if(!result) {
        return res.status(404).json({message:'Location not found'});
      }
      return res.status(200).send({message:'Location updated successfully'});
  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})
router.delete('/:id', async function(req,res){
    try {
      const {id} = req.params;
      const result = await Location.findByIdAndDelete(id);
      if(!result) {
        return res.status(404).json({message:'Location not found'});
      }
      return res.status(200).send({message:'Location deleted successfully'});
    } catch (error) {
      console.log(error.message);
      res.status(500).send({message:error.message});
    }
})

module.exports = router;