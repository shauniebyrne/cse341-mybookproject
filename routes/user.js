const router = require('express').Router();
const userController = require('../controllers/user');

//Read (GET) a singer users information
router.get('/:id', userController.getOneUser);

//Create (POST) a new user
router.post('/', userController.createUser);

module.exports = router;