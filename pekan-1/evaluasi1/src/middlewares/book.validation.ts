import type { NextFunction, Request, Response } from "express";
import { body, param, validationResult, type ValidationChain } from "express-validator";
import { errorResponse } from "../utils/response";

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        const errorList = errors.array().map(err => ({
            field: err.type === 'field' ? err.path : 'unknown',
            message: err.msg
        }))

        return errorResponse(res, "Validasi gak berhasil", 400, errorList)
    } 
}

export const createBookValidation = [
    body('judul')
        .trim()
        .notEmpty().withMessage('Judul harus diisi')
        .isLength({ min: 3 }).withMessage('Nama Buku minimal 3 karakter'),

     body('penulis')
        .trim()
        .notEmpty().withMessage('Penulis wajib diisi')
        .isLength({ min: 3 }).withMessage('Penulis minimal 3 karakter'),

    body('tahun')
        .isNumeric().withMessage('Tahun harus angka')
        .custom(value => value > 0).withMessage('Tahun harus lebih dari 0')
        .custom(value => value <= new Date().getFullYear()).withMessage('Tahun tidak boleh melebihi tahun sekarang'),

    body('stok')
        .isNumeric().withMessage('Stok harus angka')
        .custom(value => value >= 0).withMessage('Stok tidak boleh negatif')
]

export const getBookByIdValidation = [
    param('id')
        .isNumeric().withMessage('Id harus angka')
]