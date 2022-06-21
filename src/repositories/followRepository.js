import connectDB from '../config/database.js';

async function insertFollow(currentUserId, followedUserId) {
  const db = await connectDB();

  return db.query(
    'INSERT INTO followers("userId", "followedId") VALUES ($1, $2)',
    [currentUserId, followedUserId]
  );
}

async function deleteFollow(currentUserId, followedUserId) {
  const db = await connectDB();

  return db.query(
    'DELETE FROM followers WHERE "userId" = $1 AND "followedId" = $2',
    [currentUserId, followedUserId]
  );
}

export const followRepository = {
  insertFollow,
  deleteFollow,
};
