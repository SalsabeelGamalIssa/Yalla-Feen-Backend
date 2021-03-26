const router = require('express').Router();
const {requireAuth,grantAccess} = require('../middleware/authMiddleware')
const authController = require('../controllers/user_contoller')
const upload = require('../middleware/upload').upload
const validation_body = require('../middleware/validationBody')
const userSchemas = require('../validation-schema/user')

// user routes include signup and login methods 
// /user 
router.get('/',requireAuth,grantAccess('readOwn','profile'),authController.profile); //
router.post('/upload-profile-pic',requireAuth,authController.uploadAvatar);
router.post('/signup',validation_body(userSchemas.SignUpScehma),authController.signup_post);
router.post('/login',authController.login_post);
router.post('/forget-password',authController.forgetPassword);
router.post('/reset-password-token',authController.resetPasswordWithToken);
router.post('/check-token',authController.checkToken);
router.put('/edit-profile',requireAuth,authController.editProfile); //admin

// admin routes

router.get('/list',requireAuth,grantAccess('readAny','users'),authController.get_users); //admin
router.post('/create',requireAuth,grantAccess('createAny','users'),authController.create_users); //admin
router.get('/aggregate',requireAuth,grantAccess('readAny','users'),authController.aggregate_data); //admin
router.get('/search',requireAuth,grantAccess('readAny','users'),authController.search); //admin
router.get('/details/:id',requireAuth,grantAccess('readAny','users'),authController.get_user); //admin
router.put('/give-permission/:user_id',requireAuth,grantAccess('updateAny','admin'),authController.givePermission) //admin
router.put('/pan/:user_id',requireAuth,grantAccess('updateAny','admin'),authController.panUser) //admin
router.delete('/delete/:user_id',requireAuth,grantAccess('deleteAny','profile'),authController.deleteUser)
// reset password
// delete admin and owner
// ban user 

router.get('/login',(req,res)=>{
  res.send({'login':'this is login get page'})
});


module.exports = router