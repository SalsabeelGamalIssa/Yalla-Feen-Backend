const Advertise = require("../models/advertise _model");
const upload = require("../middleware/upload").upload;
const AdsImageUrl = require('dotenv').config().parsed.ADSIMAGESURL;


const createAds = (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(400).send({
        success: false,
        message: "allowed files are images and size 2mb and max-files 12 image"
      })
    }
    const body = JSON.parse(JSON.stringify(req.body));
    if (!body) {
      return res.status(400).json({
        success: false,
        error: "You must add advertise",
      });
    }
    // console.log(req.files);
  
    const advertise = new Advertise(body);
    if (!advertise) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }
    
    // res.send({location:body.location})
  
    if (req.file) {
      advertise.image =AdsImageUrl+req.file.filename
    }
    // console.log(advertise);

    advertise
      .save()
      .then(async (data) => {
        return res.status(200).json({
          success: true,
          id: advertise._id,
          message: "advertise item created",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          error,
          message: "advertise item not created",
        });
      })
  })
};

const getAllAds = async (req, res) => {
  const ads = await Advertise.find({})
  res.send({success:true,ads})
};

const updateAds = async (req, res) => {

  await advertise.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true
    },
    (err, advertise) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: err
        });
      }
      res.send({
        success: true,
        message: advertise
      })
    }
  )
  res.send(req.advertise);
};

const deleteAds = (req, res) => {
  Advertise.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (!data) {
        res.send({
          succes: false,
          message: "Ads not found"
        })
      }
      res.send({
        succes: true,
        message: `${data.title} Ads deleted`,
      })
    })
    .catch(err => {
      res.send({
        succes: false,
        error: err
      })
    });

}


module.exports = {
  createAds,
  getAllAds,
  updateAds,
  deleteAds
};
