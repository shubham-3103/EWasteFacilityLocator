const express = require('express');
const router = express.Router();
const User = require('../Models/Users')
const Authenticate = require('../Models/Authenticate')

router.post('/', async (req, res) => {
  try {
    const email = req.body.email; // Extract the email from the request body

    if (!email) {
      return res.status(400).json({ message: 'Email is required in the request body' });
    }

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the user exists, update their points
      await existingUser.save();
      return res.status(200).send(existingUser);
    } else {
      // If the user doesn't exist, create a new user
      const newUser = {
        email: email,
        points: 1
      };

      const userdata = await User.create(newUser);
      return res.status(201).send(userdata);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});
  
  router.post('/updatePoints', async function(req,res){
    try {
      const { email, points } = req.body; // Extract email and points from the request body
  
      if (!email || points === undefined) {
        return res.status(400).json({ message: 'Email and points are required in the request body' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user's points
      user.points += points;
  
      // Save the updated user to the database
      await user.save();
  
      return res.status(200).json({ message: 'Points updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/authenticate', async function(req,res){
    try {
      const { email ,item, points, count } = req.body; // Extract email and points from the request body
      console.log(item);
      if (!email || !item === undefined) {
        return res.status(400).json({ message: 'Email and points are required in the request body' });
      }
      const newAuthentication = new Authenticate({
        email,
        item,
        isSubmitted: false,
        points,
        count
      });
      await newAuthentication.save();
      return res.status(200).json({ message: 'Data goes to Facility' });
      
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/getauthenticate', async function(req,res){
    try {
      const data = await Authenticate.find({isSubmitted: false}); // Retrieve all data from the collection
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/getitem/:id', async function (req, res) {
    try {
      const _id = req.params.id;
      if (_id === undefined) { // Corrected condition
        return res.status(400).json({ message: 'id is required in the request parameter' });
      }
      const response = await Authenticate.findOne({_id});
      const item = response.item;
      console.log(item)
      res.status(200).json({ message: 'item retrieved successfully', item: item });
    } catch (error) {
      console.log('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/acceptCard/:id', async (req, res) => {
    try {
      const cardId = req.params.id; // Get the card ID from the URL
      console.log(cardId)
      const updatedCard = await Authenticate.findOneAndUpdate(
        { _id: cardId },
        { isSubmitted: true }
      );
  
      if (!updatedCard) {
        return res.status(404).json({ message: 'Card not found' });
      }
      const userEmail = updatedCard.email;
      const userpoints = updatedCard.points;
      await User.updateOne({ email: userEmail }, { $inc: { points: userpoints } });
      res.status(200).json({ message: 'Card accepted', data: updatedCard });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.delete('/deleteCard/:id', async function(req,res){
    try {
      const id = req.params.id; // Get the card ID from the URL
      if (!id) return res.status(404).json({ message: 'Card not found' });

      // Use Mongoose to delete the card by its ID
      const deletedCard = await Authenticate.findByIdAndRemove(id);

      if (!deletedCard) {
        return res.status(404).json({ message: 'Card not found' });
      }

      res.status(200).json({ message: 'Card deleted' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  })
  router.post('/reducePoints', async function(req, res) {
    try {
      const { email, points } = req.body; // Extract email and points from the request body
  
      if (!email || points === undefined) {
        return res.status(400).json({ message: 'Email and points are required in the request body' });
      }
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if reducing points will result in a negative value
      if (user.points < points) {
        return res.status(400).json({ message: 'Insufficient points to redeem this item' });
      }
  
      // Update the user's points
      user.points -= points;
  
      // Save the updated user to the database
      await user.save();
  
      return res.status(200).json({ message: 'Points updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
router.get('/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const userdata = await User.findOne({ email: email });
        if (!userdata) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(userdata);
    } catch (error) {
        console.log('Error:', error); // Add this for debugging
        res.status(500).send({ message: error.message });
    }
});


module.exports = router;
