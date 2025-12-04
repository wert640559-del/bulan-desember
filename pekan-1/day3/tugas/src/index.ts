import express, { type Application, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config(); // Memuat variabel lingkungan dari file .env

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware agar bisa baca JSON
app.use(express.json());

// =====================
// DATA MENU MAKANAN
// =====================
  let products = [
    { id: 1, nama: "Nasi Goreng", deskripsi: "Nasi goreng spesial dengan telur dan ayam", harga: 20000 },
    { id: 2, nama: "Mie Ayam", deskripsi: "Mie ayam kuah gurih dengan pangsit", harga: 18000 },
    { id: 3, nama: "Ayam Geprek", deskripsi: "Ayam crispy dengan sambal level pedas", harga: 22000 },
    { id: 4, nama: "Soto Ayam", deskripsi: "Soto hangat dengan koya dan jeruk nipis", harga: 17000 },
    { id: 5, nama: "Es Teh Manis", deskripsi: "Teh manis dingin penyegar dahaga", harga: 5000 }
  ];

// =====================
// ROUTES
// =====================

// 1. ROUTE GET – Home
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: "Selamat datang di API E-Commerce (Menu Makanan)!",
    hari: 3,
    status: "Server hidup!"
  });
});

// 2. ROUTE GET – Semua produk
app.get('/api/products', (req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: products.length,
    data: products
  });
});

// 3. ROUTE GET – Berdasarkan ID (Route Params)
app.get('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Menu tidak ditemukan"
    });
  }

  res.json({
    success: true,
    data: product
  });
});

// 4. ROUTE GET – Filter (Query String)
app.get('/api/search', (req: Request, res: Response) => {
  const { name, max_price } = req.query;

  let result = products;

  if (name) {
    result = result.filter(p =>
      p.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_price) {
    result = result.filter(p => p.harga <= Number(max_price));
  }

  res.json({
    success: true,
    filtered_result: result
  });
});

// 5. ROUTE POST – Tambah menu
app.post('/api/products', (req: Request, res: Response) => {
  const { nama, deskripsi, harga } = req.body;

  const newProduct = {
    id: products.length + 1,
    nama,
    deskripsi,
    harga: Number(harga)
  };

  products.push(newProduct);

  res.status(201).json({
    success: true,
    message: "Menu berhasil ditambahkan",
    data: newProduct
  });
});

// 6. ROUTE PUT – Update menu
app.put('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Menu tidak ada" });
  }

  products[index] = { ...products[index], ...req.body };

  res.json({
    success: true,
    message: "Menu berhasil diupdate",
    data: products[index]
  });
});

// 7. ROUTE DELETE – Hapus menu
app.delete('/api/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "Menu tidak ada" });
  }

  const deleted = products.splice(index, 1);

  res.json({
    success: true,
    message: "Menu berhasil dihapus",
    data: deleted[0]
  });
});

// =====================
// SERVER START
// =====================
app.listen(PORT, () => {
  console.log(`Server jalan → http://localhost:${PORT}`);
  console.log(`Coba buka semua route pakai Postman!`);
});
