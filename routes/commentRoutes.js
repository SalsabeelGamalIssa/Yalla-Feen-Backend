const router = require('express').Router();
const {requireAuth, grantAccess} = require('../middleware/authMiddleware');
const commentControllers = require('../controllers/commentControllers');

// Comments Routes

//admin edit 
router.post('/create',requireAuth,commentControllers.createComment);
router.get('/list',requireAuth,grantAccess('readAny','comments'),commentControllers.getComments);
router.get('/user',requireAuth,commentControllers.getUserComments);
router.put('/update/:id',requireAuth,commentControllers.updateComment);
router.delete('/delete/:id',requireAuth,commentControllers.deleteComment);



module.exports = router