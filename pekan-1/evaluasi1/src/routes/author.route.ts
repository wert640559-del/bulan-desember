import { Router } from "express";
import {
    createAuthorValidation,
    getAuthorByIdValidation,
    searchAuthorValidation,
    updateAuthorValidation
} from "../middlewares/author.validation";
import * as authorController from '../controllers/author.controller';
import { validate } from "../utils/validator";

const router = Router();

router.get('/', authorController.getAll);
router.get('/search', validate(searchAuthorValidation), authorController.search);
router.get('/:id', validate(getAuthorByIdValidation), authorController.getById);
router.post('/', validate(createAuthorValidation), authorController.create);
router.put('/:id', validate(updateAuthorValidation), authorController.update);
router.delete('/:id', validate(getAuthorByIdValidation), authorController.remove);

export default router;