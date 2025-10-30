
📘 Booklit Experiences – Slot Booking Platform

A full-stack web application that allows users to explore experiences, view available date/time slots, and book them securely with dynamic seat availability and promo code validation.

🚀 Live Demo
Frontend (Vite + React): `https://booklit-experiences-slots.onrender.com`
Backend (Express + PostgreSQL): `https://booklit-experiences-slots-backend.onrender.com`

🧠 Overview
Booklit Experiences is an end-to-end booking system where users can:
- Browse various travel or adventure experiences
- Select a date and time slot
- Choose quantity dynamically (with seat availability validation)
- Apply promo codes for discounts
- Confirm bookings and receive a unique reference ID

The system ensures real-time seat tracking using transaction locks in PostgreSQL to avoid overbooking.

🏗️ Tech Stack
Frontend
- React 19 – UI framework
- Vite – Fast build tool
- TailwindCSS – Modern CSS utility framework
- Axios – For API calls
- React Router DOM 7 – Routing between pages
- TypeScript – Type-safe frontend logic

Backend
- Node.js + Express 5 – RESTful API
- PostgreSQL – Relational database
- pg (node-postgres) – PostgreSQL client
- crypto – For generating unique booking references
- dotenv – Environment variable management
- Transactions with row locking (FOR UPDATE) – Prevent race conditions in slot booking

Deployment
- Render – For hosting both frontend and backend
- Render PostgreSQL – Managed cloud database
- GitHub – Source control and CI/CD integration

📁 Project Structure
```
Booklit-Experiences-slots/
├── bookit-backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Database connection (PostgreSQL + SSL)
│   │   ├── controllers/
│   │   │   ├── experiencesController.js # Fetch experiences & slots
│   │   │   ├── bookingsController.js    # Create and manage bookings
│   │   │   └── promoController.js       # Promo code validation logic
│   │   ├── routes/
│   │   │   ├── experiences.js
│   │   │   ├── bookings.js
│   │   │   └── promos.js
│   │   ├── server.js                  # Express app entry point
│   │   └── .env                       # Database credentials (Render URL)
│   ├── package.json
│   └── README.md
│
├── bookit-frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.ts                 # Axios setup & API methods
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
│   │   ├── App.tsx                    # Routing setup
│   │   └── main.tsx                   # React DOM entry
│   ├── public/
│   │   └── hd.png                     # Logo
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

🧩 Database Schema (PostgreSQL)
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

INSERT INTO experiences (title, description, image_url, location, price, about)
VALUES
('Kayaking', 'A fun kayaking experience', 'https://picsum.photos/400/300', 'Goa', 999, 'Learn kayaking with experts.'),
('Mountain Hike', 'Adventure trek experience', 'https://picsum.photos/400/301', 'Manali', 1299, 'A scenic hike with professional guides.');

INSERT INTO slots (experience_id, date, time, capacity, booked)
SELECT e.id, d::date, t.time, 10, 0
FROM experiences e
CROSS JOIN generate_series('2025-10-30'::date, '2025-11-05'::date, '1 day') AS d
CROSS JOIN (
  VALUES ('07:00 AM'), ('09:00 AM'), ('11:00 AM'), ('01:00 PM')
) AS t(time);

INSERT INTO promos (code, type, value, active)
VALUES ('SAVE50', 'flat', 50, TRUE), ('DISC10', 'percent', 10, TRUE);
```
⚙️ .env Configuration

Backend .env
PORT=4000
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<dbname>

Frontend .env
VITE_API_BASE=https://booklit-experiences-slots-backend.onrender.com/api

🧭 API Endpoints
GET /api/experiences - Fetch all experiences
GET /api/experiences/:id - Fetch experience by ID (with slots)
POST /api/bookings - Create new booking
POST /api/promo/validate - Validate promo code

🧑‍💻 Local Development

Backend:
cd bookit-backend
npm install
npm run dev

Frontend:
cd bookit-frontend
npm install
npm run dev

🌐 Deployment (Render)
Backend
Root directory: bookit-backend
Build command: npm install
Start command: npm start

Frontend
Root directory: bookit-frontend
Build command: npm install && npm run build
Publish directory: dist

👨‍💻 Author
Saurabh Kumar Singh
GitHub: https://github.com/sau-rabh-17
