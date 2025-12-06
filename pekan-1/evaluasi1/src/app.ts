import express, { type Application, type Request, type Response } from "express";
import helmet from "helmet";
import cors from "cors"
import morgan from "morgan";
import { successResponse } from "./utils/response";
import bookRouter from "./routes/book.route";
import memberRouter from "./routes/member.route";
import { errorHandler } from "./middlewares/error.handler";
import { apiKeyMiddleware, requestIdMiddleware, timingMiddleware } from "./middlewares/custom.middleware";

const app: Application = express()

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(requestIdMiddleware)
app.use(timingMiddleware)

app.use(apiKeyMiddleware)

app.get('/', (_req: Request, res: Response) => {
    successResponse(
        res,
        "Selamat datang di API Perpustakaan",
        {
            name: "Perpustakaan Api",
            status: "Online"
        }
    )
})

app.use('/api/books', bookRouter)
app.use('/api/members', memberRouter)

app.get(/.*/, (req: Request, _res: Response) => {
    throw new Error(`Route ${req.method} ${req.path} tidak ditemukan di API Perpustakaan!`);
})

app.use(errorHandler)

export default app;