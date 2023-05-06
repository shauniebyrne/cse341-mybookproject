const validator = require('../helper/validator');

const checkContent = async (req, res, next) => {
    const rules = {
        title: 'required|string',
        author: 'required|string',
        genre: 'required|string',
        published: 'required|integer',
        series: 'required|string',
        numberInSeries: 'required|string',
        readAgain: 'required|string'
    };
    await validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({success: false, message: 'Information cannot be validated', data: err});
        } else {
            next();
        }
    })
};

module.exports = { checkContent };