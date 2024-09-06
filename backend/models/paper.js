const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

class Paper {
  static async search(query) {
    const result = await pool.query('SELECT * FROM papers WHERE abstract ILIKE $1', [`%${query}%`]);
    return result.rows;
  }
}

module.exports = Paper;
