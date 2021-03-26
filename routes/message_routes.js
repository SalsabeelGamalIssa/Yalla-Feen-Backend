const router = require('express').Router();
const {requireAuth,grantAccess} = require('../middleware/authMiddleware');
const messageControllers = require('../controllers/message_controllers');

// Messages Routes
router.post('/create',messageControllers.createMessage);

//admin edit 
router.post('/create',messageControllers.createMessage);
router.get('/list',requireAuth,grantAccess('readAny','messages'),messageControllers.getMessages);
router.delete('/delete/:id',requireAuth,grantAccess('deleteAny','message'),messageControllers.deleteMessage);

module.exports = router