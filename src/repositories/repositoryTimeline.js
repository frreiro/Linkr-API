import connectDB from "../config/database.js";

const db = await connectDB();
async function getPost() {
    return db.query(`
    SELECT p.id,u."userName", u.image as "userImage", p.description as "postDescription", l.title, l.description, l.url, l.image 
    FROM posts p
    JOIN users u ON u.id = p."userId"
    JOIN "linkInfo" l ON l.id = p."linkId"
    ORDER BY p."createdAt" DESC
    LIMIT 20
    `);
}

export const repositoryTimeline = {
    getPost
}