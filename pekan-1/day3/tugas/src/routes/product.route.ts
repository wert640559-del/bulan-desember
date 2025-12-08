import { Router } from "express"
import { createProductValidation, getProductByIdValidation, validate } from "../middlewares/product.validation"
import { create, getAll, getById, remove, search, update } from "../controllers/product.controller"

const router = Router()

router.get('/', getAll)
router.get('/:id', validate(getProductByIdValidation), getById)
router.get('/search', search)
router.post('/', validate(createProductValidation), create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router