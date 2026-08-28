import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// TiDB Cloud Connection Pool
const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: { rejectUnauthorized: true },
  waitForConnections: true,
  connectionLimit: 10,
  connectTimeout: 30000,
});

// Test connection on startup
pool.getConnection()
  .then(conn => {
    console.log('✅ Connecté à TiDB Cloud');
    conn.release();
  })
  .catch(err => {
    console.error('❌ Erreur de connexion TiDB:', err.message);
  });

// ==========================================
// CATEGORIES
// ==========================================
app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/categories', async (req, res) => {
  const { id, name, count, status } = req.body;
  try {
    await pool.execute('INSERT INTO categories (id, name, count, status) VALUES (?, ?, ?, ?)', [id, name, count, status]);
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/categories/:id', async (req, res) => {
  const { name, count, status } = req.body;
  try {
    await pool.execute('UPDATE categories SET name = ?, count = ?, status = ? WHERE id = ?', [name, count, status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// COUPONS
// ==========================================
app.get('/api/coupons', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM coupons');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/coupons', async (req, res) => {
  const { id, code, type, value, limit, used, status } = req.body;
  try {
    await pool.execute('INSERT INTO coupons (id, code, type, value, `limit`, used, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, code, type, value, limit, used, status]);
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/coupons/:id', async (req, res) => {
  const { code, type, value, limit, status } = req.body;
  try {
    await pool.execute('UPDATE coupons SET code = ?, type = ?, value = ?, `limit` = ?, status = ? WHERE id = ?',
      [code, type, value, limit, status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/coupons/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM coupons WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// SHIPPING ZONES
// ==========================================
app.get('/api/shipping-zones', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM shipping_zones');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/shipping-zones', async (req, res) => {
  const { id, zone, price, estimatedTime, status } = req.body;
  try {
    await pool.execute('INSERT INTO shipping_zones (id, zone, price, estimatedTime, status) VALUES (?, ?, ?, ?, ?)',
      [id, zone, price, estimatedTime, status]);
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/shipping-zones/:id', async (req, res) => {
  const { zone, price, estimatedTime, status } = req.body;
  try {
    await pool.execute('UPDATE shipping_zones SET zone = ?, price = ?, estimatedTime = ?, status = ? WHERE id = ?',
      [zone, price, estimatedTime, status, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/shipping-zones/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM shipping_zones WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// PRODUCTS
// ==========================================
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    const formatted = rows.map(r => ({
      ...r,
      gallery: (() => { try { return JSON.parse(r.gallery || '[]'); } catch { return []; } })(),
      variants: (() => { try { return JSON.parse(r.variants || '[]'); } catch { return []; } })(),
    }));
    res.json(formatted);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/products', async (req, res) => {
  const { id, name, price, category, image, gallery, rating, reviewsCount, shortDescription, description, variants } = req.body;
  try {
    await pool.execute(
      `INSERT INTO products (id, name, price, category, image, gallery, rating, reviewsCount, shortDescription, description, variants)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, name, price, category, image, JSON.stringify(gallery || []), rating || 0, reviewsCount || 0, shortDescription, description, JSON.stringify(variants || [])]
    );
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/products/:id', async (req, res) => {
  const { name, price, category, image, shortDescription, description } = req.body;
  try {
    await pool.execute(
      `UPDATE products SET name = ?, price = ?, category = ?, image = ?, shortDescription = ?, description = ? WHERE id = ?`,
      [name, price, category, image, shortDescription, description, req.params.id]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// ORDERS
// ==========================================
app.get('/api/orders', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM orders');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/orders', async (req, res) => {
  const { id, client, email, phone, date, amount, items, status, color } = req.body;
  try {
    await pool.execute(
      `INSERT INTO orders (id, client, email, phone, date, amount, items, status, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, client, email, phone, date, amount, items, status, color]
    );
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/orders/:id', async (req, res) => {
  const { status, color } = req.body;
  try {
    await pool.execute('UPDATE orders SET status = ?, color = ? WHERE id = ?', [status, color, req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/orders/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM orders WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// CUSTOMERS
// ==========================================
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/customers', async (req, res) => {
  const { id, name, email, phone, orders, totalSpent, lastOrder } = req.body;
  try {
    await pool.execute(
      `INSERT INTO customers (id, name, email, phone, orders, totalSpent, lastOrder) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [id, name, email, phone, orders, totalSpent, lastOrder]
    );
    res.status(201).json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/api/customers/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// ==========================================
// SETTINGS
// ==========================================
app.get('/api/settings', async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM settings WHERE id = '1'");
    res.json(rows[0] || null);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.put('/api/settings', async (req, res) => {
  const { shopName, slogan, email, phone, address, instagram, tiktok } = req.body;
  try {
    await pool.execute(
      `UPDATE settings SET shopName = ?, slogan = ?, email = ?, phone = ?, address = ?, instagram = ?, tiktok = ? WHERE id = '1'`,
      [shopName, slogan, email, phone, address, instagram, tiktok]
    );
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur Backend API démarré sur http://localhost:${PORT}`);
});
