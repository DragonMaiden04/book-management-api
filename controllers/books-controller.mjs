import bookModel from '../models/books/details.mjs'

const post = async (req, res) => {
    try {
        await bookModel.create(req.body);
        return res.json({
            code: 200,
            enum: "SUCCESS",
            message: "book detail has been saved"
        })
    } catch(error) {
        console.error(error);
        res.status(400).json({
            code: 400,
            enum: "FAILED",
            message: error.message || "An error has occured"
        })
    }
};


export {
    post
}