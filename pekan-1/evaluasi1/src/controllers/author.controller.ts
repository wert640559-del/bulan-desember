import type { Request, Response } from "express";
import { successResponse } from "../utils/response";
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, searchAuthors, updateAuthor } from "../services/author.service";


export const getAll = async (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query;
    const { authors, total } = await getAllAuthors(
        Number(page),
        Number(limit)
    );

    successResponse(
        res,
        "Penulis berhasil diambil",
        authors,
        {
            page: Number(page),
            limit: Number(limit),
            total
        }
    );
};

export const getById = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada");
    }

    const author = await getAuthorById(req.params.id);

    successResponse(
        res,
        "Penulis berhasil diambil",
        author
    );
};

export const search = async (req: Request, res: Response) => {
    const { name } = req.query;

    const result = await searchAuthors(name?.toString());

    successResponse(
        res,
        "Pencarian penulis berhasil",
        result
    );
};

export const create = async (req: Request, res: Response) => {
    const { name, bio, birthDate } = req.body;
    
    if (!name || !birthDate) {
        throw new Error("Nama dan tanggal lahir wajib diisi");
    }

    const data = {
        name: String(name),
        birthDate: new Date(birthDate),
        ...(bio && { bio: String(bio) })
    };

    const author = await createAuthor(data);

    successResponse(
        res,
        "Penulis berhasil dibuat",
        author,
        null,
        201
    );
};

export const update = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada");
    }

    const author = await updateAuthor(req.params.id, req.body);

    successResponse(
        res,
        "Penulis berhasil diupdate",
        author
    );
};

export const remove = async (req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("Parameter id tidak ada");
    }

    const deleted = await deleteAuthor(req.params.id);

    successResponse(
        res,
        "Penulis berhasil dihapus",
        deleted
    );
};