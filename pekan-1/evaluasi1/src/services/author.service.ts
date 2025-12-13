import type { Author } from "../generated/client";
import { getPrisma } from "../prisma";

const prisma = getPrisma();

export const getAllAuthors = async (
    page: number = 1,
    limit: number = 10
): Promise<{ authors: Author[], total: number }> => {
    const skip = (page - 1) * limit;
    
    const [authors, total] = await Promise.all([
        prisma.author.findMany({
            include: { books: true },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.author.count()
    ]);

    return { authors, total };
};

export const getAuthorById = async (id: string): Promise<Author> => {
    const author = await prisma.author.findUnique({
        where: { id },
        include: { books: true }
    });

    if (!author) {
        throw new Error("Penulis tidak ditemukan");
    }

    return author;
};

export const searchAuthors = async (name?: string) => {
    return await prisma.author.findMany({
        where: {
            ...(name && {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            })
        },
        include: { books: true }
    });
};

export const createAuthor = async (data: {
    name: string;
    bio?: string;
    birthDate: Date;
}): Promise<Author> => {
    // Check if author with same name already exists
    const existingAuthor = await prisma.author.findFirst({
        where: {
            name: {
                equals: data.name,
                mode: 'insensitive'
            }
        }
    });
    
    if (existingAuthor) {
        throw new Error("Penulis dengan nama tersebut sudah ada");
    }

    return await prisma.author.create({
        data: {
            name: data.name,
            bio: data.bio,
            birthDate: data.birthDate
        }
    });
};

export const updateAuthor = async (id: string, data: Partial<Author>): Promise<Author> => {
    await getAuthorById(id);

    return await prisma.author.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date()
        },
        include: { books: true }
    });
};

export const deleteAuthor = async (id: string): Promise<Author> => {
    await getAuthorById(id);
    
    // Check if author has books
    const author = await prisma.author.findUnique({
        where: { id },
        include: { books: true }
    });

    if (author && author.books.length > 0) {
        throw new Error("Penulis masih memiliki buku. Hapus buku terlebih dahulu.");
    }

    return await prisma.author.delete({
        where: { id }
    });
};