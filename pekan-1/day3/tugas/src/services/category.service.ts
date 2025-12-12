import type { Category } from "../generated/client"
import { getPrisma } from "../prisma"

const prisma = getPrisma()

export const getAllCategories = async (): Promise<Category[]> => {
    return await prisma.category.findMany({
        where: { deletedAt: null },
        include: { products: true }
    })
}

export const getCategoryById = async (id: string): Promise<Category> => {
    const numId = parseInt(id)

    const category = await prisma.category.findUnique({
        where: { 
            id: numId,
            deletedAt: null
        },
        include: { products: true }
    })

    if (!category) {
        throw new Error("Kategori tidak ditemukan")
    }

    return category
}

export const createCategory = async (name: string): Promise<Category> => {
    const isExist = await prisma.category.findFirst({ 
        where: { 
            name,
            deletedAt: null
        }
    })
    if (isExist) throw new Error("Nama kategori sudah ada")

    return await prisma.category.create({ 
        data: { name }
    })
}

export const updateCategory = async (id: string, data: Partial<Category>): Promise<Category> => {
    await getCategoryById(id)

    const numId = parseInt(id)

    return await prisma.category.update({
        where: { 
            id: numId,
            deletedAt: null 
        },
        data
    })
}

export const deleteCategory = async (id: string): Promise<Category> => {
    await getCategoryById(id)

    const numId = parseInt(id)
    
    return await prisma.category.update({
        where: { id: numId },
        data: { deletedAt: new Date() }
    })
}