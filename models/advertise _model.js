const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const advertiseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique:true,
      lowercase:true 
    },
    description: { 
      type: String,
       required: true 
    },
    owner:{
     type:String,
     required:true
    },
    image: {
       type: String,
       required:true
    }
    
  },
  { timestamps: true }
);


const Advertise = mongoose.model("Advertise", advertiseSchema, "yalla_feen_ads");

module.exports = Advertise;
