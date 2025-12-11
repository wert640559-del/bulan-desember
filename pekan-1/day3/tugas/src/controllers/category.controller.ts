import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createCategory, getAllCategories, getCategoryById } from "../services/category.service"
export const getAll = async (_req: Request, res: Response) => {
    const categories = await getAllCategories()

    successResponse(
        res,
        "Kategori berhasil diambil",
        categories,
        null,
        200
    )
}

export const create = async (req: Request, res: Response) => {
    const category = await createCategory(req.body.name)

    successResponse(
        res,
        "kategori berhasil dibuat",
        category,
        null,
        201
    )
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Paramnya gk ada wok")
    }

    const category = await getCategoryById(req.params.id)

    successResponse(
        res,
        "Kategori berhasil diambil",
        category
    )
}

