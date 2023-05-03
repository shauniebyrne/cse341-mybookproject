const router = require('express').Router();
const infoController = require('../controllers/read');

//Read (GET) all book info from database
router.get('/', infoController.getAllBooks);

//Read (GET) a books info from database
router.get('/:id', infoController.getOneBook);

//Create (POST) a new book into database
router.post('/', infoController.createBook);

module.exports = router;