-- ======================================================
-- 🗄 DATABASE SETUP SCRIPT for BookIt Experiences App
-- ======================================================

-- ======================================================
-- 1️⃣ CREATE TABLES
-- ======================================================

-- --- EXPERIENCES TABLE ---
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  image_url TEXT,
  location VARCHAR(100),
  price INT,
  about TEXT
);

-- --- SLOTS TABLE ---
CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  experience_id INT REFERENCES experiences(id) ON DELETE CASCADE,
  date DATE,
  time VARCHAR(20),
  capacity INT,
  booked INT DEFAULT 0
);

-- --- BOOKINGS TABLE ---
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

-- --- PROMOS TABLE ---
CREATE TABLE promos (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE,
  type VARCHAR(20), -- 'flat' or 'percent'
  value INT,
  active BOOLEAN DEFAULT TRUE
);

-- ======================================================
-- 2️⃣ INSERT SAMPLE EXPERIENCES
-- ======================================================
INSERT INTO experiences (title, description, image_url, location, price, about) VALUES
('Mountain Trekking', 'Enjoy a thrilling trek through the scenic mountains.', 'https://picsum.photos/seed/trek/400/300', 'Manali', 1200, 'Perfect for beginners. Minimum age: 10. Bring sports shoes.'),
('River Rafting', 'Experience the rush of white-water rafting on fast rapids.', 'https://picsum.photos/seed/rafting/400/300', 'Rishikesh', 1800, 'For adventure lovers. Minimum age: 15. Includes safety gear.'),
('Desert Safari', 'Explore the golden dunes and enjoy a camel ride.', 'https://picsum.photos/seed/safari/400/300', 'Jaisalmer', 2500, 'Family-friendly activity. Minimum age: 8. Sunscreen advised.'),
('Scuba Diving', 'Dive into the deep blue and explore underwater life.', 'https://picsum.photos/seed/scuba/400/300', 'Goa', 3500, 'Minimum age: 12. Certified instructors included.'),
('Paragliding', 'Soar through the sky and enjoy stunning aerial views.', 'https://picsum.photos/seed/paragliding/400/300', 'Bir Billing', 2700, 'Thrill-seekers only. Minimum age: 14. Weight limit 90kg.'),
('Wildlife Safari', 'Spot tigers, elephants, and more in their natural habitat.', 'https://picsum.photos/seed/wildlife/400/300', 'Jim Corbett', 2200, 'Morning and evening batches available. Carry binoculars.'),
('Hot Air Balloon', 'Float over the scenic countryside in a colorful balloon.', 'https://picsum.photos/seed/balloon/400/300', 'Jaipur', 2000, 'Minimum age: 7. Weather-dependent. Carry a camera.'),
('Camping', 'Spend a night under the stars surrounded by nature.', 'https://picsum.photos/seed/camping/400/300', 'Kasol', 1600, 'Includes tent, dinner, and campfire. Bring warm clothes.'),
('Kayaking', 'Enjoy peaceful kayaking on crystal-clear waters.', 'https://picsum.photos/seed/kayak/400/300', 'Alleppey', 1400, 'Minimum age: 12. Life jackets provided.'),
('Snow Skiing', 'Slide through fresh snow on a mountain slope.', 'https://picsum.photos/seed/ski/400/300', 'Gulmarg', 3000, 'For all levels. Minimum age: 13. Gear rental available.');

-- ======================================================
-- 3️⃣ INSERT SLOTS (7 DAYS × 4 TIME SLOTS EACH × ALL EXPERIENCES)
-- ======================================================
INSERT INTO slots (experience_id, date, time, capacity, booked)
SELECT 
  e.id,
  gs.day::date AS date,
  t.time,
  10 AS capacity,
  0 AS booked
FROM experiences e
CROSS JOIN generate_series('2025-10-30'::date, '2025-11-05'::date, interval '1 day') AS gs(day)
CROSS JOIN (
  VALUES 
    ('07:00 AM'),
    ('09:00 AM'),
    ('11:00 AM'),
    ('01:00 PM')
) AS t(time);

-- ======================================================
-- 4️⃣ INSERT PROMO CODES
-- ======================================================
INSERT INTO promos (code, type, value, active) VALUES
('SAVE10', 'percent', 10, TRUE),
('DISCOUNT50', 'flat', 50, TRUE),
('WELCOME20', 'percent', 20, TRUE),
('FREERIDE', 'flat', 100, TRUE);

-- ======================================================
-- ✅ VERIFICATION COMMANDS
-- ======================================================
-- List all tables
-- \dt

-- Check experiences
-- SELECT * FROM experiences LIMIT 5;

-- Check slots
-- SELECT COUNT(*) FROM slots;

-- Check promos
-- SELECT * FROM promos;

-- ======================================================
-- END OF FILE
-- ======================================================
