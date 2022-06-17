import connectDB from '../config/database.js';

async function getUser(username) {
  const db = await connectDB();
  return db.query(`SELECT * FROM users WHERE users."userName"=$1`, [username]);
}

async function findUserById(userId) {
  const db = await connectDB();
  return db.query(`SELECT * FROM users WHERE users.id = $1`, [userId]);
}

async function getToken(hash, userId) {
  const db = await connectDB();
  return db.query(
    `SELECT * FROM sessions 
        WHERE token=$1 
        AND sessions.valid = true 
        AND sessions."userId" = $2`,
    [hash, userId]
  );
}

async function insertLinkInfo(metadata) {
  const { title, description, url, image } = metadata;

  const db = await connectDB();
  return db.query(
    `INSERT INTO "linkInfo" (title, description, url, image)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
    [title, description, url, image]
  );
}

async function insertPost(userId, linkInfoId, description) {
  const db = await connectDB();
  return db.query(
    `INSERT INTO posts ("userId", "linkId", description)
        VALUES ($1, $2, $3)
        `,
    [userId, linkInfoId, description]
  );
}

async function checkPostOwner(postId, userId) {
  const db = await connectDB();
  return db.query(
    `SELECT * FROM posts
        WHERE posts.id = $1 AND posts."userId" = $2
        `,
    [postId, userId]
  );
}

async function updatePost(description, postId) {
  const db = await connectDB();
  return db.query(
    `UPDATE posts
        SET description = $1
        WHERE id = $2
        RETURNING description
        `,
    [description, postId]
  );
}

export const userRepository = {
  getUser,
  findUserById,
  getToken,
  insertLinkInfo,
  insertPost,
  checkPostOwner,
  updatePost,
};
