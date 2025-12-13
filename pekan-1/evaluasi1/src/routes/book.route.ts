import { Router } from "express";
import {
    createBookValidation,
    getBookByIdValidation,
    searchBookValidation,
    updateBookValidation
} from "../middlewares/book.validation";
import * as bookController from '../controllers/book.controller';
import { validate } from "../utils/validator";

const router = Router();

router.get('/', bookController.getAll);
router.get('/search', validate(searchBookValidation), bookController.search);
router.get('/:id', validate(getBookByIdValidation), bookController.getById);
router.post('/', validate(createBookValidation), bookController.create);
router.put('/:id', validate(updateBookValidation), bookController.update);
router.delete('/:id', validate(getBookByIdValidation), bookController.remove);

export default router;