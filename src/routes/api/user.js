const express = require('express');
const router = express.Router();

const { body, validationResult } = require("express-validator");

const User = require('../../models/User');


// check for email in use
// check for password long and types
// check for age

// New User
router.post("/new_user", [
    //////////////////////////////////////////////////////////////////////////////////////////////
    // email must be an email
    body('email')
    .not()
    .isEmpty()
    .withMessage('Email is required.') 
    .isEmail()
    .withMessage('Check for proper email format.')
    .custom((value, {req}) => {
        return new Promise((resolve, reject)=>{
            // check database to existing data
            User.findOne({email:req.body.email},(err,user)=>{
                if(err){
                    reject(new Error('Server Error'));
                }
                if(Boolean(user)) {
                    reject(new Error('E-mail already in use'))
                  }
                  resolve(true)
            })
        })
    }),
    //////////////////////////////////////////////////////////////////////////////////////////////
    // password must be larger than 8 characters
    body('password')
    .isLength({min:8})
    .withMessage('Password must be larger than 8 characters and not using as a common word.'),
    //////////////////////////////////////////////////////////////////////////////////////////////
    // age must not be lower than 18 
    body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({min:18})
    .withMessage('You must be older than 18 years old.')
    //////////////////////////////////////////////////////////////////////////////////////////////
],(req,res) => {
    // extracting data from body's request
    const {name, email, password} = req.body;
    try {
        // dealing with errors
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        User.create({
            name:name,
            email:email,
            password:password
        }).then(user => {
            res.json(user);
            // console.log(user);
        });
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error during user registration');
    }

});

// // Get users
router.get("/all",async (req,res)=>{
    const users = await User.find().populate('user');
    res.json(users);
});

// // Get user by Id
router.get("/find/:id",[
    body('id')
    .not()
    .isMongoId()
    .withMessage('Please, introduce a proper MongoId')
], async (req,res) => {
    try {
        const id = req.params.id;
        const user = await User.findById({_id:id});
        res.json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error during user deploy');
    }
});

// Edit User name
router.put("/update_user/name/:id",async (req,res) => {
    try {
        //extracting data
        const new_name = req.body.name;
        //find user by id
        const id = req.params.id;
        const user = await User.findById({_id:id});
        //edit user data
        user.name = new_name;
        //save new user
        await user.save();
        res.json(user);
        console.log(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(`Server Error during user's name update`);
    }
});

// Edit User email
router.put("/update_user/email/:id", [
    [
        //////////////////////////////////////////////////////////////////////////////////////////////
        // email must be an email
        body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required.') 
        .isEmail()
        .withMessage('Check for proper email format.')
        .custom((value, {req}) => {
            return new Promise((resolve, reject)=>{
                // check database to existing data
                User.findOne({email:req.body.email},(err,user)=>{
                    if(err){
                        reject(new Error('Server Error'));
                    }
                    if(Boolean(user)) {
                        reject(new Error('E-mail already in use'))
                      }
                      resolve(true)
                })
            })
        })
        //////////////////////////////////////////////////////////////////////////////////////////////
    ]
],async (req,res) => {
    try {
        //extracting data
        const new_email = req.body.email;
        //find user by id
        const id = req.params.id;
        const user = await User.findById({_id:id});
        //edit user data
        user.email = new_email;
        //save new user
        await user.save();
        res.json(user);
        console.log(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(`Server Error during user's email update`);
    }
});
// Edit User password
router.put("/update_user/psswd/:id", [
    [
        //////////////////////////////////////////////////////////////////////////////////////////////
        // password must be larger than 8 characters
        body('password')
        .isLength({min:8})
        .withMessage('Password must be larger than 8 characters and not using as a common word.'),
        //////////////////////////////////////////////////////////////////////////////////////////////
    ]
],async (req,res) => {
    try {
        //extracting data
        const new_password = req.body.password;
        //find user by id
        const id = req.params.id;
        const user = await User.findById({_id:id});
        //edit user data
        user.password = new_password;
        //save new user
        await user.save();
        res.json(user);
        console.log(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).send(`Server Error during user's password update`);
    }
});
// // Remove User by id
router.delete('/remove/:id',[
    body('id')
    .not()
    .isMongoId()
    .withMessage('Please, introduce a proper MongoId')
],async (req,res)=>{
    try {
        const id = req.params.id;
        await User.findById({_id:id}).deleteOne();
        res.json('user deleted');

    } catch (err) {
        console.log(err.message);
        res.status(500).send(`Server Error during user's delete proccess`);
    }
});

module.exports = router;