const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const userContorller = require('../controllers/userController')


router.get('/users', authController.protect, authController.restrictTo('admin'), userContorller.getUsers);
router.get('/users/:id', authController.protect, authController.restrictTo('admin'), userContorller.getUser);
router.post('/users/signup', authController.signup)
router.post('/users/login', authController.login)

module.exports = router