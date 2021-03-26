const router = require("express").Router();
const tagsControllers = require("../controllers/tags_controllers");

const {requireAuth,grantAccess} = require('../middleware/authMiddleware');
router.get("/list", tagsControllers.getAllTags);
router.post("/create", tagsControllers.addTags);
router.get("/places/:id", tagsControllers.getAllPlaces);
router.delete("/tags/:id",requireAuth,grantAccess('deleteAny','tag'),tagsControllers.deleteTag)  // need modified just admin 

module.exports = router;
