import express, { type Application, type Request, type Response } from "express"
import dotenv from "dotenv"

dotenv.config()

const HOST = process.env.HOST
const PORT = process.env.PORT

const app: Application = express()

let products = [
  { id: 1, nama: "Laptop Asus", deskripsi: "Laptop dengan prosesor intel core i5 dan RAM 8GB", harga: 12000000 },
  { id: 2, nama: "Smartphone Samsung", deskripsi: "Smartphone dengan layar 6.1 inch dan kamera 50MP", harga: 8000000 },
  { id: 3, nama: "Tablet Apple", deskripsi: "Tablet dengan layar 10.2 inch dan memori 128GB", harga: 15000000 },
  { id: 4, nama: "Headphone Sony", deskripsi: "Headphone dengan teknologi noise cancelling dan fitur wireless", harga: 2000000 },
  { id: 5, nama: "Monitor BenQ", deskripsi: "Monitor dengan ukuran 24 inch dan resolusi full HD", harga: 2500000 }
];

app.use(express.json())

app.get("/", (_req: Request, res: Response) => {
    res.json("ini adalah api utama")
})

app.get("/products", (_req: Request, res: Response) => {
    res.json({
        status: true,
        data: products
    })
})

app.get("/products/search", (req: Request, res: Response) => {
    const { nama, harga, id } = req.query

    let result = products
    if (nama) result = result.filter(p => p.nama.toLowerCase().includes((nama as string).toLowerCase()))
    if (harga) result = result.filter(p => p.harga <= Number(harga))
    if (id) result = result.filter(p => p.id === Number(id))

    res.json({
        status: true, 
        data: result
    })
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const product = products.findIndex(p => p.id === id)

    if (!product) {
        res.json({
            status: false,
            message: "Product tidak ditemukan"
        })
    }

    res.json({
        status: true, 
        data: product
    })
})

app.delete("/products/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index = products.findIndex(p => p.id === id)

    if (index === -1) res.json({ status: false, message: "Product tidak ditemukan"})
    
    const deleted = products.splice(index, 1) 

    res.json({
        status: true, 
        data: deleted[0]
    })
})

app.post("/products", (req: Request, res: Response) => {
    const { nama, deskripsi, harga, asal } = req.body
    if (typeof harga !== 'number') {
        return res.json({
            status: false,
            message: "Harga harus berupa angka"
        })
    }

    const newProduct = {
        id: products.length + 1,
        nama, 
        deskripsi,
        harga,
        asal
    }

    products.push(newProduct)

    res.json({
        status: true,
        data: products,
        message: "Product berhasil ditambahkan"
    })
})

app.put("/products/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const index = products.findIndex(p => p.id === id)

    if (index === -1) return res.json({ status: false, message: "Product tidak ditemukan"})

    products[index] ={ ...products[index], ...req.body }

    res.json({
        status: true, 
        data: products[index],
        message: "Product berhasil diupdate"
    })
})

app.listen(PORT, () => {
    console.log(`Server berjalan di http://${HOST}:${PORT}`)
})