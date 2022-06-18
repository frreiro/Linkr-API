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
  const query = `SELECT id,hashtag FROM hashtags ORDER BY hashtags.id LIMIT 10`;
  return db.query(query);
}


async function insertHashtag(hashtagArr) {
  const hashtagTotal = hashtagArr.map((hashtag, index) => `($${index + 1})`).join()

  const db = await connectDB();
  const query = `INSERT INTO hashtags (hashtag) VALUES ${hashtagTotal}`;
  return db.query(query, hashtagArr);

}
export const hashtagsRepository = {
  findPostsByHashtagName, getHashtagName, insertHashtag
};
