const router = require('express').Router();
const infoController = require('../controllers/read');
const validation = require('../validation/validator-read');

//Read (GET) all book info from database
router.get('/', infoController.getAllBooks);

//Read (GET) a books info from database
router.get('/:id', infoController.getOneBook);

//Create (POST) a new book into database
router.post('/', validation.checkContent ,infoController.createBook);

//Update (PUT) a books info
router.put('/:id', validation.checkContent ,infoController.updateBookInfo);

//Delete a book from database
router.delete('/:id', infoController.deleteBook);

module.exports = router;