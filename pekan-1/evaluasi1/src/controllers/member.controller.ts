import type { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";
import { createMember, deleteMember, getAllMembers, getMemberById, searchMembers, updateMember } from "../services/member.service";
import { successResponse } from "../utils/response";

export const getAll = asyncHandler((_req: Request, res: Response) => {
    const { members, total } = getAllMembers()
    
    successResponse(
        res,
        "Daftar member berhasil diambil",
        {
            jumlah: total, 
            data: members
        }
    )
})

export const getById = asyncHandler((req: Request, res: Response) => {
    if (!req.params.id) {
        throw new Error("paramnya ga ada")
    }

    const member = getMemberById(req.params.id)

    successResponse(
        res, 
        "Member berhsil diambil",
        member
    )
})

export const search = asyncHandler((req: Request, res: Response) => {
    const { search, min_tanggal_daftar, max_tanggal_daftar } = req.query;

    const result = searchMembers(search?.toString(), min_tanggal_daftar?.toString(), max_tanggal_daftar?.toString())

    successResponse(
        res,
        "Member berhasil diambil",
        result
    )
})

export const create = asyncHandler((req: Request, res: Response) => {
    const { nama, email, telepon, alamat, tanggal_daftar } = req.body

    const members = createMember(nama, email, telepon, alamat, tanggal_daftar)

    successResponse(
        res,
        "Member berhasil ditambahkan",
        members,
        null,
        201
    )
})

export const update = asyncHandler((req: Request, res: Response) => {
    const member = updateMember(req.params.id!, req.body)

    successResponse(
        res,
        "Member berhasil diupdate",
        member
    )
})

export const remove = asyncHandler((req: Request, res: Response) => {
    const deleted = deleteMember(req.params.id!) 

    successResponse(
        res, 
        "Member berhasil dihapus",
        deleted
    )
})