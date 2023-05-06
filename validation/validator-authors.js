const validator = require('../helper/validator');

const checkContent = async (req, res, next) => {
    const rules = {
        name: 'required|string'
    };
    await validator(req.body, rules, {}, (err, status) => {
        if (!status) {
            res.status(412).send({success: false, message: 'Information cannot be validated', data: err});
        } else {
            next();
        }
    })
}

module.exports = { checkContent };