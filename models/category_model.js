const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      unique:true,
      required: true 
      },
    description: { 
      type: String,
       required: true 
      },
    categoryImage: {
        type: String 
    },
    places:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Place"
    }],
    tags:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tags"
      }
    ]
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema, "yalla_feen_category");

module.exports = Category;
