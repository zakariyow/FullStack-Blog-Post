import Joi from "joi";
export const validationCrearePost = async(req, res, next) => {
    const shema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(10).required()
    })

    const {error} = shema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    next();
}