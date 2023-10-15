const express = require ('express');
const {authMiddleware, isAdmin} = require ("../middlewares/authMiddleware");
const { createUser, forgotPasswordToken, resetPassword, updatePassword, loginFarmer, loginAdmin, getallUsers, handleRefreshToken, logOut, getaUser, deleteaUser, updateaUser, loginCustomer } = require('../controllers/userController');
const router = express.Router();


router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password',authMiddleware, updatePassword);
router.post('/login', loginFarmer);
router.post('/customer-login', loginCustomer);
router.post('/admin-login', loginAdmin);
router.get('/all-users', getallUsers);

router.get('/refresh', handleRefreshToken);
router.get('/logout', logOut);

router.get('/:id',authMiddleware, isAdmin, getaUser);
router.delete('/:id', deleteaUser);

router.put('/edit-user',authMiddleware, updateaUser);


module.exports = router;
