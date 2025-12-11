import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { 
    createCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategoryById, 
    updateCategory 
} from "../services/category.service"

export const getAll = async (_req: Request, res: Response) => {
    const categories = await getAllCategories()

    successResponse(
        res,
        "Kategori berhasil diambil",
        categories
    )
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada")
    }

    const category = await getCategoryById(req.params.id)

    successResponse(
        res,
        "Kategori berhasil diambil",
        category
    )
}

export const create = async (req: Request, res: Response) => {
    const { name } = req.body
    
    if (!name) {
        throw new Error("Nama kategori wajib diisi")
    }

    const category = await createCategory(String(name))

    successResponse(
        res,
        "Kategori berhasil dibuat",
        category,
        null,
        201
    )
}

export const update = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada")
    }

    const category = await updateCategory(req.params.id, req.body)

    successResponse(
        res,
        "Kategori berhasil diupdate",
        category
    )
}

export const remove = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada")
    }

    const deleted = await deleteCategory(req.params.id)

    successResponse(
        res,
        "Kategori berhasil dihapus",
        deleted
    )
}