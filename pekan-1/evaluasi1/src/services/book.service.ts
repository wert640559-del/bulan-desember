import { books, type Book } from "../models/book.model"

export const getAllBooks = () => {
    return { books: books, total: books.length }
}

export const getBookbyId = (id: string) => {
    const numId = parseInt(id)

    const book = books.find(p => p.id === numId)

    if (!book) {
        throw new Error("Ndak ada buku yang kamu cari!")
    }

    return book
}

export const searchBooks = (search?: string, min_tahun?: string, max_tahun?: string, id?: string) => {
    let result = books;

    if (search) {
        const searchLower = (search as string).toLowerCase()
        result = result.filter(p => 
            p.judul.toLowerCase().includes(searchLower) ||
            p.penulis.toLowerCase().includes(searchLower) ||
            p.deskripsi?.toString().includes(searchLower)
        );
    }

    if (min_tahun) {
        result = result.filter(p => p.tahun >= Number(min_tahun))
    }

    if (max_tahun) {
        result = result.filter(p => p.tahun <= Number(max_tahun))
    }

    if (id) {
        result = result.filter(p => p.id === Number(id))
    }

    return result
}

export const createBook = (judul: string, penulis: string, tahun: number, stok: number, deskripsi?: string) => {
    const newBook = {
        id: books.length + 1,
        judul,
        penulis,
        tahun,
        stok,
        deskripsi,
        created_at: new Date().toISOString()
    }

    books.push(newBook as Book)

    return newBook
}

export const updateBook = (id: string, data: any) => {
    const numId = parseInt(id)
    const index = books.findIndex(p => p.id === numId)

    if (index === -1) {
        throw new Error("Buku ga ada!")
    }

    books[index] = { ...books[index], ...data, updated_at: new Date().toISOString() }

    return books[index]
}

export const deleteBook = (id: string) => {
    const numId = parseInt(id)
    const index = books.findIndex(p => p.id === numId)

    if (index === -1) {
        throw new Error("Buku yang mau kamu hapus udah ga ada!")
    }

    const deleted = books.splice(index, 1)

    return deleted[0]
}