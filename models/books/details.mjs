import mongoose from "mongoose";

const BookDetails = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Book = mongoose.model("Detail", BookDetails);
export default Book