import { getPrisma } from "../prisma";
import type { Book } from "../generated/client";
const prisma = getPrisma();

export const getAllBooks = async (
    page: number = 1,
    limit: number = 10
): Promise<{ books: Book[], total: number }> => {
    const skip = (page - 1) * limit;
    
    const [books, total] = await Promise.all([
        prisma.book.findMany({
            where: { deletedAt: null },
            include: { author: true },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.book.count({ where: { deletedAt: null } })
    ]);

    return { books, total };
};

export const getBookById = async (id: string): Promise<Book> => {
    const book = await prisma.book.findUnique({
        where: {
            id,
            deletedAt: null
        },
        include: { author: true }
    });

    if (!book) {
        throw new Error("Buku tidak ditemukan");
    }

    return book;
};

export const searchBooks = async (
    title?: string,
    author?: string,
    year?: number
) => {
    return await prisma.book.findMany({
        where: {
            ...(title && {
                title: {
                    contains: title,
                    mode: 'insensitive'
                }
            }),
            ...(author && {
                author: {
                    name: {
                        contains: author,
                        mode: 'insensitive'
                    }
                }
            }),
            ...(year && { year }),
            deletedAt: null
        },
        include: { author: true }
    });
};

export const createBook = async (data: {
    title: string;
    isbn: string;
    description?: string;
    year: number;
    stock: number;
    authorId: string;
}): Promise<Book> => {
    // Check if ISBN already exists
    const existingBook = await prisma.book.findUnique({
        where: { isbn: data.isbn }
    });
    
    if (existingBook) {
        throw new Error("ISBN sudah terdaftar");
    }

    // Check if author exists
    const author = await prisma.author.findUnique({
        where: { id: data.authorId }
    });
    
    if (!author) {
        throw new Error("Penulis tidak ditemukan");
    }

    return await prisma.book.create({
        data: {
            title: data.title,
            isbn: data.isbn,
            description: data.description,
            year: data.year,
            stock: data.stock,
            authorId: data.authorId
        },
        include: { author: true }
    });
};

export const updateBook = async (id: string, data: Partial<Book>): Promise<Book> => {
    await getBookById(id);

    // If updating ISBN, check if new ISBN is unique
    if (data.isbn) {
        const existingBook = await prisma.book.findFirst({
            where: {
                isbn: data.isbn,
                id: { not: id }
            }
        });
        
        if (existingBook) {
            throw new Error("ISBN sudah digunakan oleh buku lain");
        }
    }

    return await prisma.book.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date()
        },
        include: { author: true }
    });
};

export const deleteBook = async (id: string): Promise<Book> => {
    await getBookById(id);
    
    return await prisma.book.update({
        where: { id },
        data: { deletedAt: new Date() },
        include: { author: true }
    });
};