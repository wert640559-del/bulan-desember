import { body, param } from "express-validator"
export const createOrderValidation = [
    body('user_id').isNumeric().withMessage('User ID harus angka').custom(value => value > 0),
    body('total').isNumeric().withMessage('Total harus angka').custom(value => value > 0),
    body('orderItems').isArray().withMessage('Order items harus berupa array'),
    body('orderItems.*.product_id').isNumeric().withMessage('Product ID harus angka'),
    body('orderItems.*.quantity').isNumeric().withMessage('Quantity harus angka')
]
export const getOrderByIdValidation = [
    param('id').isNumeric().withMessage('ID harus angka')
]