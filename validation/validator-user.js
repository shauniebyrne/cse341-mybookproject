const validator = require('../helper/validator');

const checkContent = async (req, res, next) => {
    const rules = {
        email: 'required|email',
        password: 'required|string|min:6'
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