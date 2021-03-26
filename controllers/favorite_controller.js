const Place = require('../models/place_model');
const User = require('../models/user_model');

const addFavorite = async (req,res)=>{
  try{
    const place_id = req.params.place_id;
    const user = req.user;
    const place = await Place.findById(place_id)
    const exist = user.favorite_places.filter(
      user_place_id => user_place_id.toString() === place_id)

    if (exist.length<1){
      user.favorite_places.push(place._id);
      user.save()
      place.favorites_count ++;
      place.save()
    }else{
      res.send({success:false,message:"place exists in favorites"})
    }

   res.send({success:true,message:"place has been added to favorites"})

  }catch(err){
    res.send(err)
  }

};


const getUserFavorites = async(req,res)=>{
  const {skip=0,limit=0} = req.query
  const user = await User.findById(req.user.id)
                         .skip(parseInt(skip)).limit(parseInt(limit))
                         .populate({path:"favorite_places",select:"title"}).exec();
  res.send({favorites_places:user.favorite_places})

};



const removeFavorite = async(req,res)=>{
    try{
      const place_id = req.params.place_id;
      const user = req.user;
      const place =await Place.findById(place_id)
      const exist = user.favorite_places.filter(
        user_place_id => user_place_id.toString() === place_id)
      console.log(exist)
      if(exist.length < 1){
        console.log(place.favorites_count)
        return res.send({success:false,message:"place does not exist"})
      }else{
      user.favorite_places.pull(place_id)
      user.save()
      place.favorites_count --;
      place.save()
      }
      res.send({success:true,message:"place has been removed from favorite places"})
    }catch(err){
      res.send(err)
    }
};

//admin controllers

module.exports = {addFavorite,getUserFavorites,removeFavorite}