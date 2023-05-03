const router = require('express').Router();
const authorsController = require('../controllers/authors');

//Read (GET) records from database
router.get('/', authorsController.getAuthorsList);

//Create (POST) authors info in database
router.post('/', authorsController.createAuthor);

module.exports = router;