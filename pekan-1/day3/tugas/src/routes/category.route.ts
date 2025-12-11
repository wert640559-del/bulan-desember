import { Router } from "express"
import { createCategoryValidation, getCategoryByIdValidation } from "../middlewares/category.validation"
import { validate } from "../utils/validator"
import * as categoryController from '../controllers/category.controller'

const router = Router()

router.get('/', categoryController.getAll)
router.get('/:id', validate(getCategoryByIdValidation), categoryController.getById)
router.post('/', validate(createCategoryValidation), categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.remove)

export default router