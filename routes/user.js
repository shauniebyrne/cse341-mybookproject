const router = require('express').Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../validation/validator-user');

//Read (GET) a singer users information
router.get('/:id', userController.getOneUser);

//Create (POST) a new user
router.post('/', isAuthenticated, validation.checkContent ,userController.createUser);

//Update (PUT) a users email or password
router.put('/:id', isAuthenticated, validation.checkContent ,userController.updateUserInfo);

//Delete a user from database
router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;