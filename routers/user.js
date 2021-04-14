
const express =  require('express');
const router = new express.Router();
const User =  require('../models').User;
const UserWallet = require('../models').UserWallet;
const authorize = require('../authorize');
// var bcrypt = require('bcryptjs');
var jwt = require ('jsonwebtoken');

const secret = require('../config/config.json').development.jwt_secert;

function createToken(user) {
  return jwt.sign(
      {
          id: user._id,
          username: user.username, 
      },
      secret,
      {
          expiresIn: "6h"
      }
  );
};


router.post('/users' , async (req,res) => {
    let us
    try{
        us = await User.create({
        username: req.body.username,
        password: req.body.password
    })
        res.status(201).send(us);
    }catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});


router.post('/users/:id/cryptoassociations' , authorize ,async (req,res) => {
    let uw
    try{
        uw = await UserWallet.create({
        cryptoName: req.body.cryptoName,
        userId: req.params.id,
        walletAddress: req.body.walletAddress
    })
        res.status(201).send(uw);
    }catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});


router.get('/users/:id/wallets' , authorize ,async (req,res) => {
    User.hasMany(UserWallet);

    let userInfo
    try{
        userInfo = await User.findAll({
            where: { id: req.params.id },
            include: [
                {
                  model: UserWallet
                }
              ]
    });

    res.status(200).send(userInfo);
    }catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
});

router.post('/login', async (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    let use
    try{
        use = await User.findAll({
            where: { username: username, password : password }
    })
        if(use.length > 0 ){
            res.status(200).send({id : use[0].id, token: createToken({_id : use[0].id, username: username})}); 
        }else{
            res.status(400).send({});
        }
    }catch (e) {
        console.log(e)
        res.status(400).send(e);
    }
})


module.exports = router;