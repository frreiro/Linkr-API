import connectDB from './../config/database.js';

async function findPostsByHashtagName(hashtag) {
  const db = await connectDB();

  const query = `
  SELECT p.id, u.id as "userId", u."userName", u.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image 
  FROM "postHashtag" ph
  JOIN hashtags h ON ph."hashtagId" = h.id
  JOIN posts p ON ph."postId" = p.id
  JOIN users u ON p."userId" = u.id
  JOIN "linkInfo" l ON l.id = p."linkId"
  WHERE hashtag = $1
  ORDER BY p."createdAt" DESC
  `;

  return db.query(query, [hashtag]);
}

async function getHashtagName() {
  const db = await connectDB();
  const query = `
  SELECT COUNT("hashtagId") as "qntUsadas", h.hashtag
  from "postHashtag" ph
  JOIN hashtags h ON h.id = ph."hashtagId"
  GROUP BY ph."hashtagId", h.hashtag
  ORDER BY "qntUsadas" DESC LIMIT 10`;
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
