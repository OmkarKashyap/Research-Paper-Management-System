const pool = require('../database/db');

class User {
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async createUser(email, hashedPassword) {
    const query = 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *';
    const { rows } = await pool.query(query, [email, hashedPassword]);
    return rows[0];
  }
}

module.exports = User;
