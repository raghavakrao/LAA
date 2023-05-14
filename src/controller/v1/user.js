const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('../../config/index');

function validateRequest(request) {
    const schema = Joi.object().keys({
        request: Joi.object({
            body: Joi.object({
                mobile: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required()
            }).required().messages({
                'any.required': 'Invalid request, missing body'
            })
        })
    });
    return schema.validate({ request }, { allowUnknown: true });
}

async function generateJwtToken(req, res){
    let { error, value} = validateRequest(req);
    if (error) {
        return res.status(401).send({message: error.details[0].message, success:false});
    }

    const token = generateToken({ mobile: req.body.mobile });
    return res.send({data: { token: token }, success: true});
}

function generateToken(payload) {
    const expiry = (!config.jwt.expiryTime || config.jwt.expiryTime  === "0")?{}: {expiresIn: config.jwt.expiryTime };
    return jwt.sign(payload,  config.jwt.secretKey,  expiry );
}


module.exports = {
    generateJwtToken
}