import pool from '../config/db.js';
import crypto from 'crypto';

export const createBooking = async (req, res) => {
  const { fullName, email, slotId, qty, promoCode } = req.body;

  if (!fullName || !email || !slotId || !qty)
    return res.status(400).json({ message: 'Missing required fields' });

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const slotResult = await client.query(
      'SELECT * FROM slots WHERE id = $1 FOR UPDATE',
      [slotId]
    );
    const slot = slotResult.rows[0];
    if (!slot) throw new Error('Slot not found');

    if (slot.booked + qty > slot.capacity)
      throw new Error('Slot is already full');

    const expRes = await client.query(
      'SELECT price FROM experiences WHERE id = $1',
      [slot.experience_id]
    );
    const exp = expRes.rows[0];
    if (!exp) throw new Error('Experience not found');

    let subtotal = exp.price * qty;
    let tax = Math.round(subtotal * 0.06);
    let discount = 0;

    if (promoCode) {
      const promoRes = await client.query(
        'SELECT * FROM promos WHERE code = $1 AND active = true',
        [promoCode]
      );
      const promo = promoRes.rows[0];
      if (promo) {
        discount =
          promo.type === 'percent'
            ? Math.round((promo.value / 100) * subtotal)
            : promo.value;
        subtotal -= discount;
      }
    }

    const total = subtotal + tax;
    const ref = crypto.randomBytes(4).toString('hex').toUpperCase();

    await client.query(
      `INSERT INTO bookings (full_name, email, qty, price, tax, total, ref, slot_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [fullName, email, qty, exp.price, tax, total, ref, slotId]
    );

    await client.query('UPDATE slots SET booked = booked + $1 WHERE id = $2', [
      qty,
      slotId,
    ]);

    await client.query('COMMIT');
    res.json({ success: true, message: 'Booking confirmed', ref });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ success: false, message: err.message });
  } finally {
    client.release();
  }
};
