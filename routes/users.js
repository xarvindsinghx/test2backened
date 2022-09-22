var express = require('express');
var router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");
const Experience = require("../models/Experience");
const Recommendation = require("../models/Recommendation");
const UserOrg = require("../models/UserOrg")

express().use(express.json());
const bcrypt = require("bcrypt");


/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});


// Get user details by its unique phoneNumber like 
// name, aboutMe, programming skills, development skills, achievements etc
router.get('/:id', async (req, res) => {
  const phoneNumber = req.params.id;
  const users = await User.findOne({phoneNumber})
  // Check if user exists or not
  if(!users) {
    res.status(401).json({ message: "User not found" });
  }
  else {
    res.status(200).json(users)
  }
})


// User login
router.post('/login', async function(req, res, next) {
  try {
    console.log(req.body)
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    let user = await User.findOne({phoneNumber});

    // Check if user exists or not
    if(!user) {
      res.status(401).json({ message: "User not found" });
    }
    else {
      //Check password correctness
      /*
      const validPassword = await bcrypt.compare(password, user.password);
      if(validPassword) {
        res.status(200).json(user);
      }
      else {
        res.status(400).json({ message: "Password incorrect" });
      }
      */
      if(password == user.password) {
        const token = await user.generateAuthToken();
        // res.cookie("auth_token", token)
        res.status(200).json({user, token});
      }
      else {
        res.status(400).json({ message: "Password incorrect" });
      }
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get('/logout', auth, async (req, res) => {
  const user = req.user
  const token = req.token
  
  try {
      user.tokens = user.tokens.filter((t) => t.token!==token)
      await user.save()
  } catch (e) {
    res.status(500).json({message: e.message})
  }

  res.status(200).json({message: "Logout successfull"})
})


// Get user experiences data
router.get('/experiences/:id', async (req, res) => {
  const phoneNumber = req.params.id;
  const experiences = await Experience.find({phoneNumber})
  // Check if user exists or not
  if(!experiences) {
    res.status(401).json({ message: "Experiences not found" });
  }
  else {
    res.status(200).json(experiences)
  }
})

// Get user experiences data
router.get('/recommendations/:id', async (req, res) => {
  const phoneNumber = req.params.id;
  const recommendations = await Recommendation.find({phoneNumber})
  // Check if user exists or not
  if(!recommendations) {
    res.status(401).json({ message: "Recommendations not found" });
  }
  else {
    res.status(200).json(recommendations)
  }
})




router.post('/insertUserOrg', auth, async (req, res) => {
  try {
    let newUserJSON = req.body;
    console.log(newUserJSON)
    const userAlready = await UserOrg.findOne({email: newUserJSON.email});
    //Check whether user already exists with same email or not
    if(userAlready) {
      res.status(400).json({ message: "User already exists with same email" });
    }
    else {

      newUserJSON.startDate = new Date(Date.now());
      console.log(newUserJSON)
      let user = new UserOrg(newUserJSON);

      user.save().then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(400).json({ message: "User not created"+err.message });
      });
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});


// Get One level up individual for user
router.get('/getOneUp/:id', auth, async (req, res) => {
  const userId = req.params.id;
  var date = new Date(Date.now());
  console.log(userId)
  const user = await UserOrg.findOne({
    userId: userId, 
    startDate: {
      $lte: date
    },
    endDate: {
      $gte: date
    }  
  });

  // Check if user exists or not
  if(!user) {
    res.status(401).json({ message: "No active line found for user" });
  }
  else {
    res.status(200).json(user)
  }
})

// Get One level down individuals for user
router.get('/users/getOneDown/:id', auth, async (req, res) => {
  const userId = req.params.id;
  var date = new Date(Date.now());
  const users = await UserOrg.findMany({
    reportingUserId: userId, 
    startDate: {
      $lte: date
    },
    endDate: {
      $gte: date
    }  
  });
  // Check if user exists or not
  if(!users) {
    res.status(401).json({ message: "No active line found for user" });
  }
  else {
    res.status(200).json(users)
  }
})


module.exports = router;
