const router = require("express").Router();
const categoryControllers = require("../controllers/category_controllers");
const { requireAuth, grantAccess } = require('../middleware/authMiddleware')

router.get("/places/:id", categoryControllers.getAllPlaces);
router.get("/tags/:id", categoryControllers.getAllTags);
router.get("/list", categoryControllers.getAllCategoryes);

// just admin 
router.get("/details/:id",requireAuth,grantAccess('readAny','category'),categoryControllers.getCategory);
router.post("/create",requireAuth,grantAccess('createAny','category'),categoryControllers.addCategory);
router.delete("/category/:id",requireAuth,grantAccess('deleteAny','category'),(req, res, next) => {
  Place.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

module.exports = router;
