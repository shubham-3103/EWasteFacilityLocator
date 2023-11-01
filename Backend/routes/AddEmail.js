const express = require('express');
const router = express.Router();
const User = require('../Models/Users')

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
