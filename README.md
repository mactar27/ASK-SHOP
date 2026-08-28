# A•S-K Shop S•N 🛍️

> **Un éclat, une signature.** — Boutique en ligne de parfums, brumes, muscs, huiles, lunettes & accessoires.

## 🚀 Technologies

| Partie | Stack |
|--------|-------|
| Frontend | React + TypeScript + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Base de données | TiDB Cloud (MySQL-compatible) |
| State management | Zustand |

## 📦 Installation

```bash
# Cloner le repo
git clone https://github.com/mactar27/ASK-SHOP.git
cd ASK-SHOP

# Installer les dépendances
npm install
```

## ⚙️ Configuration

Créer le fichier `server/.env` avec vos credentials TiDB Cloud :

```env
TIDB_HOST=your-host.tidbcloud.com
TIDB_PORT=4000
TIDB_USER=your-user
TIDB_PASSWORD=your-password
TIDB_DATABASE=test
```

## 🗄️ Initialiser la base de données

```bash
node server/initDb.js
```

## 🏃 Démarrage

```bash
# Terminal 1 — Backend API (port 3000)
node server/index.js

# Terminal 2 — Frontend (port 5173)
npm run dev
```

## 🔗 URLs

- **Boutique** : http://localhost:5173
- **Admin** : http://localhost:5173/admin
- **API** : http://localhost:3000/api

## 👤 Admin

Accès direct via `/admin` (pas d'authentification pour l'instant).

---

Réalisé par [WockyTech](https://wockytech.xyz) 🛠️
