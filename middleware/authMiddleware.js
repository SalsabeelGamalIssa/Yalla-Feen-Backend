const jwt = require('jsonwebtoken');
const User = require('../models/user_model');
const Place = require('../models/place_model')
const keys = require('../config/key');
const {roles} = require('../roles');

const requireAuth =  (req, res, next) => {
  const token = req.headers['x-access-token']
  // console.log(token);
  // console.log('this token--------'+token);
  // check json web token exists & is verified
  if (token) { // token has id,role
    jwt.verify(token,keys.JWTSecret , async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect('/user/login');
        res.send({success:false,message:"this is not a valid token"})
      } else {
        // console.log(decodedToken);
        req.user = await User.findById(decodedToken.id)
        if(!req.user){
          res.send({success:false,message:"there is  no valid token exist"})
        }
        // console.log("---------user-------(",req.user);
        next();
      }
    });
  } else {
    // res.redirect('/user/login');
    res.send({success:false,message:"there is  no valid token exist"})
  }
};

const grantAccess = (action,resource)=>{
  return (req,res,next)=>{
   try{
      // console.log('-------------------user-------------')
      // console.log(req.user);
      console.log(req.user.email);
      const permission = roles.can(req.user.role)[action](resource);
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
   }catch(err){
      next(err);
   }
  }
}
const checkPlaceOwner = async(req,res,next)=>{
    const place = await Place.findById(req.params.id).catch(err=>{
      res.status(404).send({success:false,message:"place Not Found"}
      )})
      // console.log(req.user._id.toString());
      // console.log(place.owner._id.toString());
    if(!place){
      res.status(404).send({success:false,message:"place Not Found"})
    }
    if(req.user._id.toString()==place.owner._id.toString()||req.user.role=='admin'){
      // console.log("yes you are owner");
      // req.place = place
      next();
    }else{
    res.send({success:false,message:"sorry you not owner"})
    } 
  
}
   
  





module.exports = { requireAuth,grantAccess,checkPlaceOwner};