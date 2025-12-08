import { Router } from "express";
import { create, getAll, getById, remove, search, update } from "../controllers/member.controller";
import { createMemberValidation, getMemberByIdValidation, validate } from "../middlewares/member.validation";

const router = Router()

router.get('/', getAll)
router.get('/search', search)
router.get('/:id', validate(getMemberByIdValidation), getById)
router.post('/', validate(createMemberValidation), create)
router.put('/:id', validate(createMemberValidation), update)
router.delete('/:id', validate(getMemberByIdValidation), remove)

export default router