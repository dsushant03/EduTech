const express = require('express');
const router = express.Router();

const {getAllUsersController, updateController, deleteController, loginController, addToCartController, getCartController, placeOrderController, clearCartController, getOrdersController, refreshTokenController, logoutController, deleteItemController} = require('../controller/userController');

router.get('/getAllUsers', getAllUsersController);

router.patch('/updateUser', updateController);

router.delete('/deleteUser', deleteController);

router.post('/login', loginController);

router.post('/logout', logoutController);

router.post('/addToCart', addToCartController);

router.post('/getCart', getCartController);

router.post('/placeOrder', placeOrderController);

router.post('/clearCart', clearCartController);

router.post('/getOrders', getOrdersController);

router.post('/refreshToken', refreshTokenController);

router.delete('/deleteItem', deleteItemController);

module.exports = router;