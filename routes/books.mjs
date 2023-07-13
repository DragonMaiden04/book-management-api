import express from "express";
import {post} from "../controllers/books-controller.mjs";
import schemaValidator from "../middlewares/schema-validator.mjs";
import * as schema from "../middlewares/validation_schemas/book-validation-schemas.mjs"

let router = express.Router();

router.get('/', () => {
});

router.post('/', schemaValidator(schema.postBookSchema, "body"), post)


export default router;