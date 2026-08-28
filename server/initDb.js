import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
import fs from 'fs';

const require = createRequire(import.meta.url);
const dotenv = require('dotenv');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const dbConfig = {
  host: process.env.TIDB_HOST,
  port: parseInt(process.env.TIDB_PORT || '4000'),
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: { rejectUnauthorized: true },
  connectTimeout: 30000,
};

async function initDb() {
  const conn = await mysql.createConnection(dbConfig);
  console.log('✅ Connecté à TiDB Cloud');

  // Create tables
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      count INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'Actif'
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS coupons (
      id VARCHAR(36) PRIMARY KEY,
      code VARCHAR(100) NOT NULL,
      type VARCHAR(100) NOT NULL,
      value VARCHAR(100) NOT NULL,
      \`limit\` INT DEFAULT 0,
      used INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'Actif'
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS shipping_zones (
      id VARCHAR(36) PRIMARY KEY,
      zone VARCHAR(255) NOT NULL,
      price INT DEFAULT 0,
      estimatedTime VARCHAR(100),
      status VARCHAR(50) DEFAULT 'Actif'
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      category VARCHAR(100) NOT NULL,
      image LONGTEXT NOT NULL,
      gallery LONGTEXT,
      rating FLOAT DEFAULT 0,
      reviewsCount INT DEFAULT 0,
      shortDescription TEXT,
      description TEXT,
      variants TEXT
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id VARCHAR(36) PRIMARY KEY,
      client VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      date VARCHAR(50) NOT NULL,
      amount INT NOT NULL,
      items INT NOT NULL,
      status VARCHAR(100) DEFAULT 'En attente',
      color VARCHAR(200) DEFAULT 'bg-blue-100 text-blue-700'
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      orders INT DEFAULT 0,
      totalSpent INT DEFAULT 0,
      lastOrder VARCHAR(50)
    )
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      id VARCHAR(10) PRIMARY KEY,
      shopName VARCHAR(255) NOT NULL,
      slogan VARCHAR(255),
      email VARCHAR(255),
      phone VARCHAR(100),
      address TEXT,
      instagram VARCHAR(500),
      tiktok VARCHAR(500)
    )
  `);

  // Check if data already exists
  const [rows] = await conn.execute('SELECT COUNT(*) as cnt FROM categories');
  const count = rows[0].cnt;

  if (count === 0) {
    console.log('🌱 Insertion des données initiales...');

    // Categories
    await conn.execute(`INSERT INTO categories (id, name, count, status) VALUES
      ('1', 'Parfums', 45, 'Actif'),
      ('2', 'Brumes', 12, 'Actif'),
      ('3', 'Muscs', 8, 'Actif'),
      ('4', 'Huiles', 5, 'Actif'),
      ('5', 'Lunettes', 15, 'Actif'),
      ('6', 'Accessoires', 20, 'Actif')
    `);

    // Coupons
    await conn.execute(`INSERT INTO coupons (id, code, type, value, \`limit\`, used, status) VALUES
      ('1', 'BIENVENUE10', 'Pourcentage', '10%', 100, 45, 'Actif'),
      ('2', 'LIVRAISONFREE', 'Frais de port', 'Gratuit', 50, 50, 'Expiré'),
      ('3', 'PROMO2000', 'Montant fixe', '2000 FCFA', 200, 120, 'Actif')
    `);

    // Shipping
    await conn.execute(`INSERT INTO shipping_zones (id, zone, price, estimatedTime, status) VALUES
      ('1', 'Dakar & Banlieue', 2000, '24h - 48h', 'Actif'),
      ('2', 'Régions', 3000, '48h - 72h', 'Actif'),
      ('3', 'Casamance', 4000, '3 - 5 jours', 'Actif')
    `);

    // Products
    await conn.execute(`INSERT INTO products (id, name, price, category, image, gallery, rating, reviewsCount, shortDescription, description, variants) VALUES
      ('1', 'Parfum Signature A-S-K', 25000, 'Parfums',
        'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
        '["https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=200"]',
        4.8, 32,
        'Un parfum doux et envoûtant qui laisse une signature inoubliable.',
        'Découvrez notre parfum signature, un mélange exquis de notes florales et boisées.',
        '["50ml","100ml"]'),
      ('2', 'Brume Légère Vanille', 12000, 'Brumes',
        'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&q=80&w=800',
        '[]', 4.5, 18,
        'Une brume rafraîchissante aux notes gourmandes de vanille de Madagascar.',
        'Parfaite pour une retouche fraîcheur à tout moment de la journée.',
        '["200ml"]'),
      ('3', 'Musc Blanc Premium', 8500, 'Muscs',
        'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=800',
        '[]', 4.9, 56,
        'Le classique intemporel. Un musc blanc pur, doux et extrêmement tenace.',
        'Notre musc blanc est réputé pour sa pureté et sa longue tenue.',
        '["3ml","6ml","12ml"]')
    `);

    // Orders
    await conn.execute(`INSERT INTO orders (id, client, email, phone, date, amount, items, status, color) VALUES
      ('#1258', 'Fatou Diop', 'fatou@example.com', '77 123 45 67', '15/08/2026', 30000, 2, 'En attente', 'bg-blue-100 text-blue-700'),
      ('#1257', 'Aissatou Sy', 'aissatou@example.com', '76 987 65 43', '14/08/2026', 25000, 1, 'Confirmée', 'bg-green-100 text-green-700'),
      ('#1256', 'Mariama Sarr', 'mariama@example.com', '70 111 22 33', '12/08/2026', 8000, 1, 'Livrée', 'bg-purple-100 text-purple-700')
    `);

    // Customers
    await conn.execute(`INSERT INTO customers (id, name, email, phone, orders, totalSpent, lastOrder) VALUES
      ('C001', 'Fatou Diop', 'fatou@example.com', '77 123 45 67', 5, 125000, '15/08/2026'),
      ('C002', 'Aissatou Sy', 'aissatou@example.com', '76 987 65 43', 2, 45000, '14/08/2026'),
      ('C003', 'Mariama Sarr', 'mariama@example.com', '70 111 22 33', 8, 210000, '12/08/2026')
    `);

    // Settings
    await conn.execute(`INSERT INTO settings (id, shopName, slogan, email, phone, address, instagram, tiktok) VALUES
      ('1', 'A.S.K._Shop_SN', 'Un éclat, une signature.', 'ask.shop.sn@gmail.com', '221 77 460 18 67', 'Dakar, Sénégal', 'https://instagram.com/a.s.k._shop_sn', '')
    `);

    console.log('✅ Données initiales insérées avec succès !');
  } else {
    console.log('ℹ️  Données existantes détectées, pas de réinsertion.');
  }

  await conn.end();
  console.log('🎉 Base de données TiDB initialisée !');
}

initDb().catch(err => {
  console.error('❌ Erreur init DB:', err.message);
  process.exit(1);
});
