import type { Request, Response } from "express"
import { successResponse } from "../utils/response"
import { createOrder, deleteOrder, getAllOrders, getOrderById, updateOrder } from "../services/order.service"

export const getAll = async (_req: Request, res: Response) => {
    const { orders, total } = await getAllOrders()
    successResponse(res, "Orders berhasil diambil", { jumlah: total, data: orders })
}

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) throw new Error("Parameter id tidak ada")
    const order = await getOrderById(req.params.id)
    successResponse(res, "Order berhasil diambil", order)
}

export const create = async (req: Request, res: Response) => {
    const { user_id, total, orderItems } = req.body
    if (!user_id || !total || !orderItems) throw new Error("Data order tidak lengkap")
    
    const order = await createOrder({
        user_id: Number(user_id),
        total: Number(total),
        orderItems: orderItems.map((item: any) => ({
            product_id: Number(item.product_id),
            quantity: Number(item.quantity)
        }))
    })
    successResponse(res, "Order berhasil dibuat", order, null, 201)
}

export const update = async (req: Request, res: Response) => {
    if (!req.params.id) throw new Error("Parameter id tidak ada")
    const order = await updateOrder(req.params.id, req.body)
    successResponse(res, "Order berhasil diupdate", order)
}

export const remove = async (req: Request, res: Response) => {
    if (!req.params.id) throw new Error("Parameter id tidak ada")
    const deleted = await deleteOrder(req.params.id)
    successResponse(res, "Order berhasil dihapus", deleted)
}