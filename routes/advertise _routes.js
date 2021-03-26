const router = require('express').Router();
const {requireAuth, grantAccess} = require('../middleware/authMiddleware');
const advertiseControllers = require('../controllers/advertise_controllers');

// Advertise Routes
router.get("/list",
           advertiseControllers.getAllAds);

//admin edit 
router.post('/create',
            requireAuth,
            grantAccess('createAny','advertise'),
            advertiseControllers.createAds);

router.put('/update/:id',
           requireAuth,
           grantAccess('updateAny','advertise'),
           advertiseControllers.updateAds);

router.delete('/delete/:id',
              requireAuth,
              grantAccess('deleteAny','advertise'),
              advertiseControllers.deleteAds);

module.exports = router