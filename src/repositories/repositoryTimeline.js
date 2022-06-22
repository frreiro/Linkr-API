import connectDB from "../config/database.js";

const db = await connectDB();
async function getPost(page, userId) {
    const offset = `OFFSET ${page * 10}`
    return db.query(`
    SELECT p.id, u.id as "userId", u."userName", u.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image, 0 as "retweetCount", p."createdAt", false as "isRetweet", null as "retweeterUsername"
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN "linkInfo" l ON l.id = p."linkId"
    LEFT JOIN followers f ON f."followedId" = u.id
    WHERE f."userId" = $1
    UNION ALL 
    SELECT p.id, u1.id as "userId", u1."userName", u1.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image, r1."retweetCount", r."createdAt", true as "isRetweet", u2."userName" as "retweeterUsername"
    FROM posts p
    JOIN retweets r ON r."postId" = p.id
    JOIN (
        SELECT COUNT(retweets.id) AS "retweetCount", retweets."postId"
        FROM retweets
        JOIN posts ON retweets."postId" = posts.id
        GROUP BY posts.id, retweets."postId"
    ) r1 ON r1."postId" = p.id
    JOIN users u1 ON u1.id = p."userId"
    JOIN users u2 ON u2.id = r."userId"
    JOIN "linkInfo" l ON l.id = p."linkId"
    LEFT JOIN followers f2 ON f2."followedId" = u1.id
    WHERE f2."userId" = $1
    ORDER BY "createdAt" DESC
    ${offset}
    LIMIT 10
    `, [userId]);
}

async function getToken(token) {
    return db.query(
        `SELECT * FROM sessions 
        WHERE token=$1
        AND sessions.valid = true
        AND EXISTS (SELECT "userId" FROM users WHERE id = sessions."userId")`
        , [token]
    )
}

async function checkUserFollowed(userId) {
    return db.query(
        `SELECT f."followedId" 
        FROM followers f
        WHERE f."userId" = $1`
        , [userId]
    )
}

export const repositoryTimeline = {
    getPost, getToken, checkUserFollowed
}