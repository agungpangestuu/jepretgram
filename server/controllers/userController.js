const ObjectId = require('mongodb').ObjectId
const Users = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errmsg = require('../helper/handle_error_message_users')
require('dotenv').config()
const secret_key = process.env.secretKey
const {Facebook, FacebookApiException} = require('fb'),
    fb = new Facebook({version: 'v2.11'});


const userFindAll = function (req, res) {
  Users.find().then( function (data_Users){
    console.log('[+] get all user')
    res.status(200).send(data_Users)
  }).catch(function (err){
    console.log('err[-] get all user')
    res.status(500).send(err)
  })
}
const userFindUsername = function (req,res) {
  let username = {
    username: req.params.username
  }
  Users.findOne(username)
  .then( data => {
    console.log(data)
    res.status(200).json({
      message : 'sukses cuy',
      dataUser : data
    })
  })
  .catch(err => {
    console.log(err)
    res.json({
      message : err
    })
  })
}
const userFindById = function (req,res) {
  let id = {
    _id : ObjectId(req.params.id)
  }
  Users.findById(id).then(function (data_User) {
  console.log(data_User)
  res.status(201).send(data_User)
  }).catch( function (err) {
    console.log('[-] error User find by id')
  })
}
const userCreate = function (req,res) {
  let newUser = new Users({
    fullname : req.body.fullname,
    username : req.body.username,
    password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
    email : req.body.email,
    admin : false
  })
  console.log('new user >>', newUser)
  newUser.save().then(function(){
    res.status(201).send('[+] 1 User Created from register')
  }).catch( function (err) {
    console.log('[-] error User Create from register')
    res.send({
      msg: errmsg(err),
      err: err
    }).status(200)
  })
}
const updateUser = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Users.findById(id).then(function(data_Users){
    console.log(req.body)
    data_Users.avatar = req.body.avatar || data_Users.avatar
    data_Users.fullname = req.body.fullname || data_Users.fullname
    data_Users.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)) || data_Users.password
    data_Users.email = req.body.email || data_Users.email  
    data_Users.username = req.body.username || data_Users.username
    let tokenJwt = jwt.sign({
      id : data_User.id,
      username : data_User.username,
      fullname: data_User.fullname,
      user_Id: data_User.id,
      avatar: data_User.avatar,
      email: data_User.email
    }, secret_key)
    //save update
    data_Users.save().then(function(){
      res.status(201).json({
        status: true,
        token: tokenJwt,
        message: 'User has been update'
      })
    }).catch(function(err){
      console.log('[-] error User Update', err)
      res.status(500).json({
        message: err,
        status: false
      })
    })
  })
}
const destroyUser = function (req, res) {
  let id = {
    _id : ObjectId(req.params.id)
  }
  // console.log(id, '<<<<masuk')
  Users.findByIdAndRemove(id).then(function(){
    res.status(201).send('[+] 1 User Deleted')
  }).catch(function(err){
    console.log('[-] error User Deleted')
    res.status(500).send(err)
  })
}

const SignIn = function (req, res) {
  Users.findOne({
    username: req.body.username
  }).then(function(data_User){
    if(data_User){
      bcrypt.compare(req.body.password, data_User.password).then(function(result){
        if(result){
          console.log('data user signin>>', data_User.id)
          jwt.sign({
            id : data_User.id,
            username : data_User.username,
            fullname: data_User.fullname,
            user_Id: data_User.id,
            avatar: data_User.avatar,
            email: data_User.email
          }, secret_key, function(err, token){
            if(!err){
              console.log('this token >>', token)
              res.status(201).send({
                success: true,
                message: 'Enjoy your token!',
                token: token,
                username: data_User.username,
                fullname: data_User.fullname,
                user_Id:data_User.id
              })
            }
          })
        }else{
          res.status(403).send({
            msg: result
          })
        }
      })
    }else{
      res.status(404).send({
        msg: data_User
      })
    }
  }).catch(function(err){
    if(err){
      res.status(500).send(err)
      console.log('err >>', err)
    }
  })
}
const fbLogin = (req,res) => {
  req.header.tokenFb = req.body.authResponse.accessToken
  fb.setAccessToken(req.body.authResponse.accessToken);
  fb.api(req.body.authResponse.userID,{fields:["id","name","email","picture"]},(response)=>{
    console.log(response)
    if(!response || response.error){
      res.send({status:false});
    } else {
      User.count({email:response.email}).then((result)=>{
        console.log(result);
        if(result === 0){
          const user = new Users({
              fb_id:response.id,
              email:response.email,
              name:response.name,
              username: response.name,
              password: 'password',
              avatar:response.picture.data.url
          })
          .save((err,stats)=>{
            const loginToken = jwt.sign({id:stats._id},jwtSecret);
            res.send({status:true, token:loginToken, id: stats._id, name: stats.name, picture: stats.profile});
          });
          // sendEmail(response.name,response.email);
        }
        else {
          console.log(result);
          Users.findOne({email:response.email},(err,data)=>{
            // console.log(err)
              const loginToken = jwt.sign({id:data._id},jwtSecret);
              res.send({status:true, token:loginToken, id: data._id, name:data.name, picture: data.profile});
          });
        }
        }).catch((err)=>{
            res.send({status:false});
          });
      }
  });
}
const follow = function(req,res){
  let id = {
    _id : ObjectId(req.params.id)
  }
  Users.findById(id, function (err, user) {
    if (err) return handleError(err);
    if(user.following.indexOf(req.body.userFollow) == -1){
      user.following.push(req.body.userFollow)
      user.save(function (err, updatedUser) {
        if (err) return handleError(err);
        let userFollows = {
          _id : req.body.userFollow
        }
        Users.findById(userFollows, function (err, userFollow) {
          if (err) return handleError(err);  
          userFollow.followers.push(req.params.id)
          userFollow.save(function (err, updatedFollowing) {
            if (err) return handleError(err);
            res.status(200).json({
              message: 'oke',
              data : updatedFollowing
            })
          });
        });
      });
    } 
    else {
      res.status(304)
    }
    
  });
}
const unfollow = function(req,res){
  let id = {
    _id : req.params.id
  }
  Users.findById(id, function (err, user) {
    if (err) return console.log(err);  
    user.following.splice(user.following.indexOf(req.body.userFollow), 1)
    user.save(function (err, updatedUser) {
      if (err) return console.log(err);
      let userFollows = {
        _id : req.body.userFollow
      }
      Users.findById(userFollows, function (err, userFollow) {
        if (err) return console.log(err);  
        userFollow.followers.splice(userFollow.followers.indexOf(req.params.id), 1)
        userFollow.save(function (err, updatedFollowers) {
          if (err) return console.log(err);
          res.status(200).json({
            message: 'oke',
            data: updatedFollowers
          })
        });
      });
    });
  });
}
module.exports = {
  userFindAll,
  userFindUsername,
  userFindById,
  userCreate,
  updateUser,
  destroyUser,
  SignIn,
  fbLogin,
  unfollow,
  follow
}