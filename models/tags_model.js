const mongoose = require("mongoose");

const Tags = mongoose.model(
  "Tags",
  new mongoose.Schema({
    title: {
      type:String,
      required:true,
      unique:true
    },
    places: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Place"
    }]
  },{
    timestamps:true
  })
);

module.exports = Tags;
