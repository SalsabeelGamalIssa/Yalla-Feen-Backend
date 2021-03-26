const Tags = require("../models/tags_model");



addTags = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add tag",
    });
  }

  const tags = new Tags(body);

  if (!tags) {
    return res.status(400).json({ success: false, error: err });
  }

  tags
    .save()
    .then(() => {
      return res.status(200).json({
        success: true,
        id: tags._id,
        message: "Tag has created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Tag has not created",
      });
    });
};

getAllTags = async (req, res) => {
  await Tags.find({}, (err, tags) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!tags.length) {
      return res.status(404).json({ success: false, error: `Tag not found` });
    }
    return res.status(200).json({ success: true, data: tags });
  }).catch((err) => console.log(err));
};

deleteTag = async (req, res) => {
    Tags.findByIdAndDelete({ _id: req.params.id })
    .then((data) => {
      res.json(data)})
    .catch(next);
    res.send("Delete " + result);
  }

  getAllPlaces = async(req,res)=>{
    const tag = await Tags
                          .findById(req.params.id)
                          .populate({path:"places",select:["title","location"]})
                          .exec()
                          .catch(err => res.status(404)
                          .send({succes:false,message:"Tag Not found"}));
                                   
    res.send({success:true,places:tag.places})  
  }

  
  //admin controllers
module.exports = { addTags, getAllTags, deleteTag, getAllPlaces };
