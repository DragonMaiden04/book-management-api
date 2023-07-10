const schemaValidator = (schema, property) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req[property]);
        if (error) {
            const { details } = error; 
            const message = details.map(i => i.message).join(',');
            return res.status(422).json({
                code: 422,
                enum: "FAILED",
                message: message
            })
        }
        next();
    }
}

export default schemaValidator;