import connectDB from './../config/database.js';

async function findPostsByHashtagName(hashtag) {
  const db = await connectDB();

  const query = `
  SELECT * FROM hashtags 
  JOIN "postHashtag"
  ON hashtags.id = "postHashtag"."hashtagId"
  JOIN posts
  ON posts.id = "postHashtag"."postId"
  WHERE hashtags."hashtag" = $1
  `;

  return db.query(query, [hashtag]);
}

//TODO: possível contador nas hashtags pra saber quais são mais escritas
async function getHashtagName(hashtag) {
  const db = await connectDB();
  const query = `SELECT id,hashtag FROM hashtags ORDER BY hashtags.id`;
  return db.query(query);
}


export const hashtagsRepository = {
  findPostsByHashtagName, getHashtagName
};
