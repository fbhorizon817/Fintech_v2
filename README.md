# Fintech Balance Horizon — Full Stack Project

```
Fintech/
├── .env.example     ← Sirf YAHI ek env file hai, backend/.env banane ke liye copy karein
├── frontend/        ← React Website  (port 5173)
├── backend/         ← Node.js + Express + MongoDB API  (port 5000)
└── admin/           ← Admin Dashboard  (port 5174)
```

---

## Setup (Step by Step)

### Step 1 — .env banayein
```bash
# Root mein .env.example ko backend mein copy karein
cp .env.example backend/.env

# Phir backend/.env file khol ke yeh values fill karein:
# MONGO_URI, EMAIL_USER, EMAIL_PASS, ADMIN_SECRET_KEY
```

### Step 2 — Frontend ka VITE_API_URL set karein
```bash
echo "VITE_API_URL=http://localhost:5000/api" > frontend/.env
echo "VITE_API_URL=http://localhost:5000/api" > admin/.env
```

### Step 3 — Backend chalayein
```bash
cd backend
npm install
npm run seed    # Sample blog posts daalein (sirf pehli baar)
npm run dev     # http://localhost:5000
```

### Step 4 — Frontend chalayein
```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
```

### Step 5 — Admin Panel chalayein
```bash
cd admin
npm install
npm run dev     # http://localhost:5174
```

---

## Admin Panel Login
`backend/.env` mein jo `ADMIN_SECRET_KEY` set ki hai — wohi key admin panel mein enter karein.
Default: `fbh@Admin#2024`
