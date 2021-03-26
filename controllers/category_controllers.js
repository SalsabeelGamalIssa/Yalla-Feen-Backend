const Category = require("../models/category_model");

addCategory = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add category",
    });
  }

  const category = new Category(body);

  if (!category) {
    return res.status(400).json({ success: false, error: err });
  }

  category
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: category._id,
        message: "Category has created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Category has not created",
      });
    });
};

getAllCategoryes = async (req, res) => {
  await Category.find({}, (err, categoryes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!categoryes.length) {
      return res.status(404).json({ success: false, error: `Category not found` });
    }
    return res.status(200).json({ success: true, data: categoryes });
  }).catch((err) => console.log(err));
};

getCategory = async (req, res) => {
  const category = await Category.findOne({'_id':req.params.id}).catch(err=> 
    res.status(404).send({sucess:false,message:"category not found"}))
                          
  res.send({success:true,category:category})
};


getAllPlaces = async(req,res)=>{
  const category = await Category
                        .findById(req.params.id)
                        .populate({path:"places",select:["title","location"]})
                        .exec()
                        .catch(err => res.status(404)
                        .send({succes:false,message:"Category Not found"}));
                                 
  res.send({success:true,places:category.places})  
}
getAllTags = async(req,res)=>{
  const category = await Category
                        .findById(req.params.id)
                        .populate({path:"tags",select:["title"]})
                        .exec()
                        .catch(err => res.status(404)
                        .send({succes:false,message:"Category Not found"}));
                                 
  res.send({success:true,tags:category.tags})  
}
deleteCategory = async (req, res) => {
    Category.findByIdAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
    res.send("Delete " + result);
  }

  //admin controllers
  
module.exports = { addCategory, getAllCategoryes, deleteCategory,getAllPlaces,getAllTags,getCategory };
