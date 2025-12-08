import type { Request, Response } from "express"
import { createBook, deleteBook, getAllBooks, getBookbyId, searchBooks, updateBook } from "../services/book.service"
import { successResponse } from "../utils/response"
import { asyncHandler } from "../utils/async.handler"

export const getAll = asyncHandler((_req: Request, res: Response) => {
    const { books, total } = getAllBooks()

    successResponse(
        res,
        "Daftar buku berhasil diambil",
        {
            jumlah: total,
            data: books
        }
    )
})

export const getById = asyncHandler((req: Request, res: Response) => {
    const book = getBookbyId(req.params.id!)

    successResponse(res, "Buku berhasil diambil", book)
})

export const search = asyncHandler((req: Request, res: Response) => {
    const { search, min_tahun, max_tahun } = req.query;

    const result = searchBooks(search?.toString(), min_tahun?.toString(), max_tahun?.toString())

    successResponse(
        res,
        "Buku berhasil diambil",
        result
    )
})

export const create = asyncHandler((req: Request, res: Response) => {
    const { judul, penulis, tahun, stok, deskripsi } = req.body

    const book = createBook(judul, penulis, tahun, stok, deskripsi)

    successResponse(
        res,
        "Buku berhasil ditambahkan",
        book,
        null,
        201,
    )
})

export const update = asyncHandler((req: Request, res: Response) => {
    const book = updateBook(req.params.id!, req.body)

    successResponse(
        res,
        "Buku berhasil diupdate",
        book
    )
})

export const remove = asyncHandler((req: Request, res: Response) => {
    const deleted = deleteBook(req.params.id!)

    successResponse(
        res,
        "Buku berhasil dihapus",
        deleted
    )
})