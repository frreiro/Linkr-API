import connectDB from "../config/database.js";

const db = await connectDB();
async function getPost(page) {
    const offset = `OFFSET ${page * 10}`
    return db.query(`
    SELECT p.id, u.id as "userId", u."userName", u.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image 
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN "linkInfo" l ON l.id = p."linkId"
    ORDER BY p."createdAt" DESC
    ${offset}
    LIMIT 10
    `);
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

export const repositoryTimeline = {
    getPost, getToken
}