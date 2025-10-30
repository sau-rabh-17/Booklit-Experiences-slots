📘 **Booklit Experiences – Slot Booking Platform**

A full-stack web application that allows users to explore experiences, view available date/time slots, and book them securely with dynamic seat availability and promo code validation.

---

## 🚀 Live Demo
**Frontend (Vite + React):** [https://booklit-experiences-slots.onrender.com](https://booklit-experiences-slots.onrender.com)  
**Backend (Express + PostgreSQL):** [https://booklit-experiences-slots-backend.onrender.com](https://booklit-experiences-slots-backend.onrender.com)

---

## 🧠 Overview
Booklit Experiences is an end-to-end booking system where users can:
- Browse various travel or adventure experiences  
- Select a date and time slot  
- Choose quantity dynamically (with seat availability validation)  
- Apply promo codes for discounts  
- Confirm bookings and receive a unique reference ID  

It ensures real-time seat tracking using **PostgreSQL transactions** (`FOR UPDATE`) to prevent overbooking.

---

## 🏗️ Tech Stack

### 🖼️ Frontend
- **React 19** – UI framework  
- **Vite** – Fast build tool  
- **TailwindCSS** – Utility-first CSS framework  
- **Axios** – For API calls  
- **React Router DOM 7** – Routing  
- **TypeScript** – Type-safe development  

### ⚙️ Backend
- **Node.js + Express 5** – RESTful API  
- **PostgreSQL** – Relational database  
- **pg (node-postgres)** – Database client  
- **crypto** – Unique booking reference generation  
- **dotenv** – Manage environment variables  
- **Transactions with FOR UPDATE** – Prevent race conditions in bookings  

### ☁️ Deployment
- **Render** – Hosting (frontend + backend)  
- **Render PostgreSQL** – Managed database  
- **GitHub** – Source control and CI/CD integration  

---

## 📁 Project Structure
```
Booklit-Experiences-slots/
├── bookit-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── experiencesController.js
│   │   │   ├── bookingsController.js
│   │   │   └── promoController.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   ├── app.js
│   │   ├── server.js
│   ├── .env (ignored in Git)
│   ├── .env.sample
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── setup_db.sql (schema + data insertion)
│
├── bookit-frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── BackButton.tsx
│   │   │   ├── DateSelector.tsx
│   │   │   ├── TimeSlots.tsx
│   │   │   ├── BookingSummary.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   └── Confirmation.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx
│   │   │   ├── Details.tsx
│   │   │   └── Checkout.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── public/
│   │   └── hd.png
│   ├── .env (ignored in Git)
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## 🧩 Database Schema (PostgreSQL)
```
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  image_url TEXT,
  location VARCHAR(100),
  price INT,
  about TEXT
);

CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  date DATE,
  time VARCHAR(20),
  capacity INT,
  booked INT DEFAULT 0
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100),
  email VARCHAR(100),
  qty INT,
  price INT,
  tax INT,
  total INT,
  ref VARCHAR(20) UNIQUE,
  slot_id INT REFERENCES slots(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE promos (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE,
  type VARCHAR(20),
  value INT,
  active BOOLEAN DEFAULT TRUE
);
```

---

## ⚙️ `.env` Configuration

### 🖥️ Backend (`bookit-backend/.env`)
```
PORT=4000
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
```

### 💻 Frontend (`bookit-frontend/.env`)
```
VITE_API_BASE=https://booklit-experiences-slots-backend.onrender.com/api
```

---

## 🧭 API Endpoints
| Method | Endpoint | Description |
|--------|-----------|--------------|
| GET | `/api/experiences` | Fetch all experiences |
| GET | `/api/experiences/:id` | Fetch experience details (with slots) |
| POST | `/api/bookings` | Create a new booking |
| POST | `/api/promo/validate` | Validate a promo code |

---

## 💻 Local Development

### 🚀 Backend
```
cd bookit-backend
npm install
npm run dev
```

### 🖼️ Frontend
```
cd bookit-frontend
npm install
npm run dev
```

---

## 🌐 Deployment (Render)

### 🧩 Backend (Node + Express)
- **Root Directory:** `bookit-backend`  
- **Build Command:** `npm install`  
- **Start Command:** `npm start`  

### 🎨 Frontend (Vite + React)
- **Root Directory:** `bookit-frontend`  
- **Build Command:** `npm install && npm run build`  
- **Publish Directory:** `dist`  

---

## 👨‍💻 Author
**Saurabh Kumar Singh**  
🌍 GitHub: [https://github.com/sau-rabh-17](https://github.com/sau-rabh-17)
