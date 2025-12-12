import { Router } from "express"
import { createOrderValidation, getOrderByIdValidation } from "../middlewares/order.validation"
import { validate } from "../utils/validator"
import * as orderController from '../controllers/order.controller'
const router = Router()
router.get('/', orderController.getAll)
router.get('/:id', validate(getOrderByIdValidation), orderController.getById)
router.post('/', validate(createOrderValidation), orderController.create)
router.put('/:id', orderController.update)
router.delete('/:id', orderController.remove)
export default router