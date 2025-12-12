import type { Order } from "../generated/client"
import { getPrisma } from "../prisma"
const prisma = getPrisma()

export const getAllOrders = async (): Promise<{orders: Order[], total: number}> => {
    const orders = await prisma.order.findMany({ 
        where: { deletedAt: null },
        include: { 
            orderItems: {
                include: { product: true }
            }
        }
    })
    return { orders, total: orders.length }
}

export const getOrderById = async (id: string): Promise<Order> => {
    const numId = parseInt(id)
    const order = await prisma.order.findUnique({
        where: { id: numId, deletedAt: null },
        include: { 
            orderItems: { include: { product: true } }
        }
    })
    if (!order) throw new Error("Order tidak ditemukan")
    return order
}

export const createOrder = async (data: {
    user_id: number, 
    total: number, 
    orderItems: {product_id: number, quantity: number}[]
}): Promise<Order> => {
    return await prisma.order.create({
        data: {
            user_id: data.user_id,
            total: data.total,
            orderItems: {
                create: data.orderItems.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity
                }))
            }
        },
        include: { orderItems: { include: { product: true } } }
    })
}

export const updateOrder = async (id: string, data: Partial<Order>): Promise<Order> => {
    await getOrderById(id)
    const numId = parseInt(id)
    return await prisma.order.update({
        where: { id: numId, deletedAt: null },
        data
    })
}

export const deleteOrder = async (id: string): Promise<Order> => {
    await getOrderById(id)
    const numId = parseInt(id)
    return await prisma.order.update({
        where: { id: numId },
        data: { deletedAt: new Date() }
    })
}