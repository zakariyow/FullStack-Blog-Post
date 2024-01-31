import Joi from "joi";
export const regsiterUserValidation = async(req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(20).required(),
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    next();
}

export const validationLogin = async (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(5).required()
    })

    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    next();
}