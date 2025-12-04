import express, { type Application, type Request, type Response } from "express";
import dotenv from "dotenv";

dotenv.config()

const HOST = process.env.HOST
const PORT = process.env.PORT

const app: Application = express()

let products = [
  { id: 1, nama: "Nasi Goreng", deskripsi: "Nasi goreng spesial dengan telur dan ayam", harga: 20000 },
  { id: 2, nama: "Mie Ayam", deskripsi: "Mie ayam kuah gurih dengan pangsit", harga: 18000 },
  { id: 3, nama: "Ayam Geprek", deskripsi: "Ayam crispy dengan sambal level pedas", harga: 22000 },
  { id: 4, nama: "Soto Ayam", deskripsi: "Soto hangat dengan koya dan jeruk nipis", harga: 17000 },
  { id: 5, nama: "Es Teh Manis", deskripsi: "Teh manis dingin penyegar dahaga", harga: 5000 }
];

app.use(express.json()) // biar server kita bisa proses json

app.get("/", (_req: Request, res: Response) => {
    res.json("helo, world")
})
app.get("/products", (_req: Request, res: Response) => {
    res.json({
        status: true,
        data: products
    })
})

app.get("/products/search", (req: Request, res: Response) => {
    const { nama, max_price, min_price } = req.query

    let result = products
    if (nama) result = result.filter(p => p.nama.toLowerCase().includes((nama as string).toLowerCase()))
    if (max_price) result = result.filter(p => p.harga <= Number(max_price))
    if (min_price) result = result.filter(p => p.harga >= Number(min_price))

    res.json({
        status: true,
        data: result
    })
})

app.get("/products/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id!)
    const product = products.find(p => p.id === id)

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

    if (index === -1 ) res.json({ success: false, message: "produk tidak ditemukan"})
    
    const deleted = products.splice(index, 1) //splice fungsi buat hapus array

    res.json({
        status: true, 
        data: deleted[0]
    })
})

app.post("/products", (req: Request, res: Response) => {
    const {nama, deskripsi, harga} = req.body 
    if (typeof harga !== 'number') {
        return res.json({
            status: false,
            message: 'Harganya bukan angka'
        })
    }

    const newProduct = {
        id: products.length + 1,
        nama,
        deskripsi,
        harga
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

    if (index === -1) return res.json({status: false, message: "Product tidak ditemukan"})

        products[index] = { ...products[index], ...req.body }

        res.json({
            status: true,
            message: "Product berhasil diupdate",
            data: products[index]
        })
})

app.listen(PORT, () => {
    console.log(`Server running at ${HOST}:${PORT}`)
})

