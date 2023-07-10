import Joi from "joi";


const postBookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().required()
})

export {
    postBookSchema
}