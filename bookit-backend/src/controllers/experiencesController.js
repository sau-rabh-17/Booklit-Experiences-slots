import pool from '../config/db.js';

export const getExperiences = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM experiences');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching experiences' });
  }
};

export const getExperienceById = async (req, res) => {
  const { id } = req.params;
  try {
    const exp = await pool.query('SELECT * FROM experiences WHERE id = $1', [id]);
    if (exp.rows.length === 0) return res.status(404).json({ error: 'Not found' });


    const slots = await pool.query(
      `SELECT * FROM slots 
       WHERE experience_id = $1
       ORDER BY date ASC, to_timestamp(time, 'HH12:MI AM') ASC`,
      [id]
    );

    res.json({ ...exp.rows[0], slots: slots.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching experience details' });
  }
};

