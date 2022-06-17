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

export const hashtagsRepository = {
  findPostsByHashtagName,
};
