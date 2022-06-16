import connectDB from '../config/database.js';

const db = await connectDB();

async function searchEmail(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
}

async function insertSession(id, token) {
  return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`, [id, token]);
}

export const repositoryLogIn = {
  searchEmail,
  insertSession,
};
