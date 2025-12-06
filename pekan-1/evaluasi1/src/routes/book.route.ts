import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controllers/book.controller";
import { createBookValidation, getBookByIdValidation, validate } from "../middlewares/book.validation";

const router = Router()

router.get('/', getAll)
router.get('/search', search)
router.get('/:id', validate(getBookByIdValidation), getById)
router.post('/', validate(createBookValidation), create)
router.put('/:id', validate(createBookValidation), update)
router.delete('/:id', validate(getBookByIdValidation), remove)

export default router;