const express = require('express');
const UsersModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRouter = express.Router();

// user registration
userRouter.post('/register', async (req, res) => {
    // validation
    if(!req.body.name || !req.body.username || !req.body.password || !req.body.email) {
        res.status(400).send({ message : "Invalid fields"});
    }else{
        const userFound = await UsersModel.findOne({where: { Email_id : req.body.email }});
        if(userFound){
            res.status(400).send({ message : "User already Registered"});
        }else{
            const hashPassword = await bcrypt.hashSync(req.body.password, 10);
           await UsersModel.create({
                Name : req.body.name,
                user_Name : req.body.username,
                Password : hashPassword,
                Email_id : req.body.email
            })
            .then(Newuser => {
                res.status(200).send({Data:{
                    user_Id : Newuser.id
                }})
            })
            .catch(err =>{
                res.status(500).send({message:"Something went wrong Please try again later"})
            });
        }
    }
});

// login user
userRouter.post('/login', async(req, res) =>{
    // validate
    if(!req.body.email || !req.body.password){
        res.status(400).send({ message : "Invalid fields"});
    }else{
        const userFound = await UsersModel.findOne({where: {Email_id: req.body.email}});
        if(!userFound){
            res.status(400).send({ message : "User not Registered"});
        }else{
          const userVerified =  bcrypt.compareSync(req.body.password, userFound.Password)
            if(userVerified) {
                res.status(200).send({ Data :{
                    user_id : userFound.id,
                    name : userFound.Name,
                    username : userFound.user_Name,
                    email : userFound.Email_id,
                    token : jwt.sign({userFound}, process.env.SECRET_KEY)
                }});
            }else{
                res.status(400).send({ message : "Invalid password"});
            }
        }
    }
});


module.exports = userRouter;