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
//   router.get('/', async function(req,res){
//     try {
//       const userdata = await User.find({});
//       return res.status(200).json(userdata);
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).send({message: error.message})
//     }
// })
// router.get('/:email', async (req, res) => {
//     try {
//         const { email } = req.params;
//         const userdata = await User.findOne({ email: email });
//         if (!userdata) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         return res.status(200).json(userdata);
//     } catch (error) {
//         console.log('Error:', error); // Add this for debugging
//         res.status(500).send({ message: error.message });
//     }
// });


module.exports = router;
