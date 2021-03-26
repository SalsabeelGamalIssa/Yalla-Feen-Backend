const router = require("express").Router();
const ratingControllers = require("../controllers/rating_controllers");
const {requireAuth,grantAccess} = require('../middleware/authMiddleware')

// admin 
router.get("/list",requireAuth,grantAccess('readAny','rating') ,ratingControllers.getRating);






// router.post("/update", ratingControllers.updateRating);
// router.delete("/rating/:id", (req, res, next) => {
//   Place.findOneAndDelete({ _id: req.params.id })
//   .then((data) => res.json(data))
//   .catch(next);
// });

// router.post("/create",requireAuth ,ratingControllers.addRating);

module.exports = router;
