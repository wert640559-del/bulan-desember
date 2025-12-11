import { Router } from "express";
import * as category from '../controllers/category.controller'

const router = Router()

router.get('/category/', category.getAll)
router.get('/category/:id', category.getById)
router.post('/category', category.create)

export default router;