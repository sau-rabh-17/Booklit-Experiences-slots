import pool from '../config/db.js';

export const validatePromo = async (req, res) => {
  const { code } = req.body;
  try {
    const promo = await pool.query('SELECT * FROM promos WHERE code = $1 AND active = true', [code]);
    if (promo.rows.length === 0) return res.json({ valid: false });
    res.json({ valid: true, promo: promo.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error validating promo' });
  }
};
