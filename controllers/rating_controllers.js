const Rating = require("../models/rating_model");

addRating = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add rating",
    });
  }

  const rating = new Rating(body);
  rating.user = req.user._id
  if (!rating) {
    return res.status(400).json({ success: false, error: err });
  }

  rating
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: rating._id,
        message: "Rating has created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Rating has not created",
      });
    });
};

getRating = async (req, res) => {
  await Rating.find({}, (err, rating) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!rating.length) {
      return res.status(404).json({ success: false, error: `Rating not found` });
    }
    return res.status(200).json({ success: true, data: rating });
  }).catch((err) => console.log(err));
};

updateRating = async(req,res)=>{
    const rating_id = req.params.id;
    const rating = await Rating.findById(rating_id);
    if(req.user._id.toString() === rating.user.toString()){
      console.log('ok your are the person who create rating');
    }else{
      res.send({baduser:"this is not your rating"})
    }
    res.send({rating})
  }

deleteRating = async (req, res) => {
    Rating.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
    res.send("Delete " + result);
  }

//admin controllers

  
module.exports = { 
    addRating,
    getRating,
    deleteRating,
    updateRating 
  };
