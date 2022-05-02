const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

const JWT_SECRET = "iamsendingajwtsecret"

//ROUTE 1 : Create a user usin POST: "/api/auth/createuser" does not require authentication
const User = require('../models/User')
router.post('/createuser', [
    body('name', "Enater a valid name..").isLength({ min: 3 }),
    body('email', "Enter a valid Email..").isEmail(),
    body('password', "Password must legnth at least 5 charcters").isLength({ min: 5 }),
], async (req, res) => {
    // if there is error return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Sorry ! Email already exist." })
        }
        // Secue password using bcryptjs
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        // create or save an user to database
        user = await User.create({
            // check whether email is already exist of not
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})


//ROUTE 2 : Authenticate usin POST: "/api/auth/login" does not require login
router.post('/login', [
    body('email', "Enater a valid email..").isEmail(),
    body('password', "Password can not be empty..").exists(),
], async (req, res) => {
    // if there is error return error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ error: "Please enter a valid credential.." })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please enter correct credential.." })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }

});

// ROUTE 3 : get logged in user's detail using : POST "/api/auth/getuser", logged in required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select()
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error")
    }
})

module.exports = router;