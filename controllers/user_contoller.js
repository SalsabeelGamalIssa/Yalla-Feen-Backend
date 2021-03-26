const User = require("../models/user_model");
const Place = require("../models/place_model");
const jwt = require('jsonwebtoken');
const userImagesURL = require('dotenv').config().parsed.USERIMAGESURL
const upload = require('../middleware/upload').upload
const sendMail = require('../utils/sendmail');

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



// get users
module.exports.get_users = async(req,res)=>{
  const {skip=0,limit=0} = req.query
  const users = await User.find({})
                          .skip(parseInt(skip)).limit(parseInt(limit));
  res.send({usersData:users})
}
// get users
module.exports.get_user = async(req,res)=>{
  
  const user = await User.findOne({'_id':req.params.id}).catch(err=> 
    res.status(404).send({sucess:false,message:"User not found"}))
                          
  res.send({success:true,user:user})
}

module.exports.search = async(req,res)=>{
  const {username,email}=req.query;
  let user ;
  if(username){
    user = await User.find({'username':{"$regex":username}}).catch(err=> 
    res.status(404).send({sucess:false,message:"User not found"}))
  }else if(email){
    user = await User.find({'email':{"$regex":email}}).catch(err=> 
      res.status(404).send({sucess:false,message:"User not found"}))
  }else{
    res.send({success:false,message:"you should search by username or email"})
  }               
  res.send({success:true,user:user})
}
// -----------------------admin routes -----------------------
// give permission 
module.exports.givePermission  = async(req,res) =>{
  let user = await User.findOneAndUpdate({'_id':req.params.user_id}, {'role':'admin'}, {
    returnOriginal: false
  }).catch(err => {res.status(404).send({sucess:false,message:"User not found"})});
  
  res.status(204).send({success:true,message:`${user.username} has became an Admin now`})
}

// delete user by id
module.exports.deleteUser = async(req,res)=>{
  var id = req.params.user_id; //here you pass the id
    User
   .findByIdAndRemove(id)
   .exec()
   .then(function(user) {
       return user
    }).catch(function(error) {
      res.status(404).send({success:false, message: "User not found"})
    });
    res.send({success:true,message:"User has been deleted"})
}




// user
// edit profile
module.exports.editProfile = async(req,res) =>{
  console.log(req.body);
  req.user.city = (req.body.city)?req.body.city:req.user.city
  req.user.firstname = (req.body.firstname)?req.body.firstname:req.user.firstname
  req.user.lastname = (req.body.lastname)?req.body.lastname:req.user.lastname
  req.user.email = (req.body.email)?req.body.email:req.user.email
  try{
  await req.user.save();
  }catch(err){
    res.send({message:false,success:"can't update"})
  }
  // console.log(req.user);
  res.send({success:true,message:"User Updated"})
}

// signup api method
module.exports.signup_post = async(req, res) => {
 try{
    const {password} = req.body
    const user = new User(req.body)
    user.setPassword(password);
    user.reset_token = password;
    console.log(user.reset_token);
    await user.save()
    res.send({success:true,message:"user has been created",data:user.generateJWT()})
 }catch(err){
  //  console.log(err);
   res.send({success:false,message:"faild to create user",error:err.message})
 }
}

// user profile
module.exports.profile = (req, res) => {

  res.send({profile:req.user});
}

// login method[POST]  user/login

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ role: user.role ,token:user.generateJWT(),username:user.username});
  }
  catch (err) {
    // const errors = handleErrors(err);
    res.status(400).json({ error:err.message });
  }

}

module.exports.uploadAvatar = async(req,res) =>{
  upload.single('avatar')(req,res,err=>{
    if(err){
      return res.status(400).send({
        success:false,
        message:"allow file is image and size 2mb"})
    }
    req.user.avatar = userImagesURL+req.file.filename
    req.user.save()
    res.send({message:"User profile update",sccuess:true})
  })
}


module.exports.forgetPassword = async(req,res) =>{
  const user = await User.findOne({email:req.body.email})
  if(!req.body.email){
    res.status(400).send({success:false,message:"you should enter your mail"})
  }
  if(!user){
    res.status(404).send({success:false,message:"User Not Found"})
    
  }

  user.reset_token = Math.floor(Math.random()*1000000);
  user.save()
  
  mailOptions = {
    from:    "Admin@YallaFeen.com",
    to:      user.email,
    subject: "Yalla Feen Forget Password",
    text:    `hello \n use this Token ${user.reset_token} to reset your password `
  }
  
  sendMail.transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.send({success:true,message:"the mail has benn sent with Token"})
}

module.exports.checkToken = async(req,res)=>{
  const user = await User.findOne({email:req.body.email})
  if(!req.body.email||!req.body.reset_token){
    res.status(400).send({success:false,message:"you should enter your mail, token"})
  }
  if(!user){
    res.status(404).send({success:false,message:"User Not Found"})
  }
  if(req.body.reset_token== user.reset_token){
      res.send({success:true,message:"Token are valid"})
  }
  res.status(400).send({success:false,message:"ask for your valid token"})
}

module.exports.resetPasswordWithToken = async(req,res) =>{
  const user = await User.findOne({email:req.body.email})
  if(!req.body.email||!req.body.reset_token||!req.body.newPassword){
    res.status(400).send({success:false,message:"you should enter your mail, token and newPassword"})
  }
  if(!user){
    res.status(404).send({success:false,message:"User Not Found"})
  }
  if(req.body.reset_token== user.reset_token){
  user.setPassword(req.body.newPassword)
  user.save();
  }else{
    res.status(400).send({success:false,message:"ask for your valid token"})
  }

  res.send({success:true,message:"Password has been updated"})

}

module.exports.create_users = async(req,res)=>{
  const user = new User(req.body)
  console.log(req.body.password);
  try{
  user.setPassword(req.body.password)
  }catch(err){
    res.send({password:"enter vaild password"})
  }
  await user.save().catch(err=> res.send({err}))
  res.send({data:req.body})
}

module.exports.panUser = async(req,res)=>{
  let user = await User.findOne({'_id':req.params.user_id})
      user.isactive = !user.isactive;
      await user.save()
  let active = (user.isactive)?"actived":"panned"
  
  res.send({success:true,message:`${user.username} has became ${active}`})

}

module.exports.aggregate_data = async(req,res)=>{
 const userdata =  await User.aggregate([{$group:{_id:"$city",total:{$sum:1}}}])
 const activeUsers =  await User.aggregate([{$group:{_id:"$isactive",total:{$sum:1}}}])
 const placedata =  await Place.aggregate([{$group:{_id:"$city",total:{$sum:1}}}])
 const approvedPlaces =  await Place.aggregate([{$group:{_id:"$isApproved",total:{$sum:1}}}])
 const topPlaces = await Place.find({}).sort([['favorites_count',-1]]).limit(3).exec();
 const countPlaces = await Place.count({})
 const countUsers = await User.count({})

//  console.log(countPlaces);
//  console.log(countUsers);
// console.log(placedata);
  res.send({
            userCountGraph:userdata,
            placeCountGraph:placedata,
            topPlaces,
            approvedPlaces,
            activeUsers,
            counts:{countPlaces,countUsers}
            });
}
//admin controllers
