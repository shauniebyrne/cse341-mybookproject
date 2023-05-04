const router = require('express').Router();

router.use('/', require('./swagger'));
router.use('/user', require('./user'));
router.use('/authors', require('./authors'));
router.use('/read', require('./read'));

module.exports = router;