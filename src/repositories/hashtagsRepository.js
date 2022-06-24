import connectDB from './../config/database.js';

async function findPostsByHashtagName(hashtag, page) {
  const db = await connectDB();
  const offset = `OFFSET ${page * 10}`
  const query = `
  SELECT p.id, u.id as "userId", u."userName", u.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image 
  FROM "postHashtag" ph
  JOIN hashtags h ON ph."hashtagId" = h.id
  JOIN posts p ON ph."postId" = p.id
  JOIN users u ON p."userId" = u.id
  JOIN "linkInfo" l ON l.id = p."linkId"
  WHERE hashtag = $1 AND p."deletedAt" IS NULL
  ORDER BY p."createdAt" DESC
  ${offset}
  LIMIT 10
  `;

  return db.query(query, [hashtag]);
}

async function getHashtagName() {
  const db = await connectDB();
  const query = `
  SELECT h.id,COUNT("hashtagId") as "qntUsadas", h.hashtag
  from "postHashtag" ph
  JOIN hashtags h ON h.id = ph."hashtagId"
  GROUP BY ph."hashtagId", h.hashtag, h.id
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
  const query = `
      INSERT INTO "postHashtag" ("postId","hashtagId")
      SELECT $1, $2
      WHERE NOT EXISTS 
      (SELECT "postId","hashtagId" FROM "postHashtag" ph WHERE ph."postId" = $1 AND ph."hashtagId" = $2)`;
  return db.query(query, [postId, hashtagId]);
}

async function hashtagInPost(postId) {
  const db = await connectDB();
  const query = `SELECT ph."hashtagId" FROM "postHashtag" ph WHERE ph."postId" = $1`;
  return db.query(query, [postId]);
}

async function deleteHashtagInPost(postId, hashtagId) {
  const db = await connectDB();
  const query = `DELETE FROM "postHashtag" WHERE "postId" = $1 AND "hashtagId" = $2`;
  return db.query(query, [postId, hashtagId]);
}


export const hashtagsRepository = {
  findPostsByHashtagName,
  getHashtagName,
  insertHashtag,
  checkExistHashtag,
  linkPostAndHashtags,
  hashtagInPost,
  deleteHashtagInPost
};
