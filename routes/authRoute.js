const express = require ('express');
const passport = require('passport');

const {authMiddleware, isAdmin} = require ("../middlewares/authMiddleware");
const { createUser, forgotPasswordToken, resetPassword, updatePassword, loginFarmer, loginAdmin, getallUsers, handleRefreshToken, logOut, getaUser, deleteaUser, updateaUser, loginCustomer } = require('../controllers/userController');
const router = express.Router();

router.get('/', (req, res)=>{
  res.render('index')
})

router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password',authMiddleware, updatePassword);
router.post('/login', loginFarmer);
router.post('/customer-login', loginCustomer);
router.post('/admin-login', loginAdmin);
router.get('/all-users', authMiddleware, isAdmin, getallUsers);



router.get('/refresh', handleRefreshToken);
router.get('/logout', logOut);

router.get('/:id',authMiddleware, isAdmin, getaUser);
router.delete('/:id', deleteaUser);

router.put('/edit-user',authMiddleware, updateaUser);


router.get('/auth/google',
  passport.authenticate('google', {scope: ["email", "profile"]}));

router.get('/auth/google/callback',
  //passport.authenticate('google', { failureRedirect: '/google/failure' }),
  passport.authenticate('google', { failureRedirect: '/login' }),

  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
    //res.redirect('/google/success');

  });

 

  // router.get('/google/success', (req, res)=>{
  //   res.json ({
  //     msg: "User successfully logged in"
  //   });
  // })

  
  // router.get('/google/failure', (req, res)=>{
  //   res.json ({
  //     msg: "Failed to Login"
  //   });
  // })

  


module.exports = router;
