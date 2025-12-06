import type { NextFunction, Request, Response } from "express";

export const requestIdMiddleware = (req: Request, _res: Response, next: NextFunction ) => {
    const requestId = req.headers['x-request-id'] || `req-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    req.headers['x-request-id'] = requestId
    next()
}

export const timingMiddleware = (req: Request, _res: Response, next: NextFunction) => {
    console.log(`Request masuk: ${req.method} ${req.path}`)
    req.startTime = Date.now()
    next()
}

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key']

    if (!apiKey) {
        return res.status(401).json({
            success: false,
            message: "Header X-API-Key wajib diisi untuk akses API!"
        })
    }

    if (apiKey !== 'admin1234') {
        return res.status(401).json({
            success: false,
            message: "API Key tidak valid!"
        })
    }

    next()
}