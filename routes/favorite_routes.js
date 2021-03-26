const router = require('express').Router();
const {requireAuth,grantAccess} = require('../middleware/authMiddleware');
const favoriteControllers = require('../controllers/favorite_controller');

// favorites Routes

router.post('/add/:place_id',requireAuth,favoriteControllers.addFavorite);
router.get('/list',requireAuth,favoriteControllers.getUserFavorites);
router.delete('/remove/:place_id',requireAuth,favoriteControllers.removeFavorite); 

router.get('/isfavorite/:place_id',requireAuth,(req,res)=>{
  const exist = req.user.favorite_places.filter(
  user_place_id => user_place_id.toString() === req.params.place_id);
  console.log(exist);
  if(exist.length>0){
    res.status(200).send({success:true,message:"place is exist in favorites"})
  }
  res.status(404).send({success:false,message:"place does not exist in favorites"})
});

module.exports = router