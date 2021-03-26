const router = require("express").Router();
const placeControllers = require("../controllers/place_controllers");
const {requireAuth,checkPlaceOwner, grantAccess} =  require('../middleware/authMiddleware');


// puplic user
router.get("/list", placeControllers.getAllPlaces);
router.get("/top", placeControllers.getTopRatedPlaces);
router.get("/details/:id",placeControllers.getPlaceDetails);
router.get("/place-title/:title",placeControllers.placeSearch);
router.get("/find/:category/:tagTitle",placeControllers.customFilter);
router.get("/search",placeControllers.customSearch);
router.get("/related/:id", placeControllers.getRelatedPlaces);
router.post("/nearest",placeControllers.nearestPlaces);

// only host and admin
router.get("/my-places",requireAuth,placeControllers.getOwnerPlaces); 
router.post("/create", requireAuth,placeControllers.addPlace);
router.post("/approve/:id", requireAuth,grantAccess('updateAny','place'),placeControllers.approvePlace);
router.get("/need-approve", requireAuth,grantAccess('readAny','place'),placeControllers.needApprove);
router.put("/update/:id",requireAuth,checkPlaceOwner,placeControllers.updatePlace); //need admin[done] 
router.delete("/delete/:id",requireAuth,checkPlaceOwner,placeControllers.deletePlace); // need admin[done]

// add comment to place/crate-comment/place_id
router.post("/create-comment/:id",requireAuth,placeControllers.addCommentToPlace);

// add tag to place
router.post("/add-tag/:id",requireAuth,placeControllers.addTagToPlace);

// add rating place/add-rating/place_id
router.post("/add-rating/:id",requireAuth,placeControllers.addRatingToPlace);

module.exports = router;


// // look at place images
// router.post('/images',(req,res)=>{
//   upload.array('images',12)(req,res,function(err){
//     if(err){
//       return res.status(400).send({
//           success:false,
//           message:"allowed files are images and size 2mb and max-files 12 image"})
//       }
//     console.log(req.files);
//     const body = JSON.parse(JSON.stringify(req.body));
//     console.log(body);
//     res.send({success:true,message:"i got them"})
//   })
  
 
// })
 
