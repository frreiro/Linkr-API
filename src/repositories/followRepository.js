import connectDB from '../config/database.js';

async function checkFollowStatus(currentUserId, followedUserId) {
  const db = await connectDB();

  return db.query(
    'SELECT COUNT(*) FROM followers WHERE "userId" = $1 AND "followedId" = $2;',
    [currentUserId, followedUserId]
  );
}

async function insertFollow(currentUserId, followedUserId) {
  const db = await connectDB();

  return db.query(
    'INSERT INTO followers("userId", "followedId") VALUES($1, $2)',
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

async function followingList(userId){
  const db = await connectDB();

  return db.query(`SELECT "followedId" FROM followers WHERE "userId" = $1`, [userId]);
}

export const followRepository = {
  checkFollowStatus,
  insertFollow,
  deleteFollow,
  followingList
};
