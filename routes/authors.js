const router = require('express').Router();
const authorsController = require('../controllers/authors');
const validation = require('../validation/validator-authors');

//Read (GET) records from database
//Only able to GET whole list so that list can be 
//shown on website, don't need access to an individual author for this 
router.get('/', authorsController.getAuthorsList);

//Create (POST) authors info in database
router.post('/', validation.checkContent, authorsController.createAuthor);

//Update (PUT) authors info in database
router.put('/:id', validation.checkContent ,authorsController.updateAuthor);

//Delete an author from database
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;