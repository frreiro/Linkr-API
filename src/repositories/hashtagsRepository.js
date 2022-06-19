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
async function getHashtagName() {
  const db = await connectDB();
  const query = `
  SELECT hashtag, COUNT(hashtag) as "qntUsadas" 
    FROM hashtags 
    GROUP BY hashtag 
    ORDER BY "qntUsadas" DESC 
    LIMIT 10`;
  return db.query(query);
}


async function insertHashtag(hashtag) {
  const db = await connectDB();
  const query = `INSERT INTO hashtags (hashtag) VALUES ($1) RETURNING id`;
  return db.query(query, [hashtag]);

}

async function checkExistHashtag(hashtag) {

  const db = await connectDB();
  const query = `SELECT id FROM hashtags WHERE hashtag = $1`;
  return db.query(query, [hashtag]);
}

async function linkPostAndHashtags(postId, hashtagId) {
  const db = await connectDB();
  const query = `INSERT INTO "postHashtag" ("postId", "hashtagId") VALUES ($1,$2)`;
  return db.query(query, [postId, hashtagId]);
}

export const hashtagsRepository = {
  findPostsByHashtagName, getHashtagName, insertHashtag, checkExistHashtag, linkPostAndHashtags
};
