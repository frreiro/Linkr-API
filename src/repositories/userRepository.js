import connectDB from "./../../config/bank.js"

async function getUser(username) {
    const db = await connectDB()
    return db.query(`SELECT * FROM users WHERE users."userName"=$1`, [username])
}

async function getToken(hash, userId) {
    const db = await connectDB()
    return db.query(
        `SELECT * FROM sessions 
        WHERE token=$1 
        AND sessions.valid = true 
        AND sessions."userId" = $2`,
        [hash, userId]
    )
}

async function insertLinkInfo(metadata) {
    const { title, description, url, image } = metadata

    const db = await connectDB()
    return db.query(
        `INSERT INTO "linkInfo" (title, description, url, image)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [title, description, url, image]
    )
}

async function insertPost(userId, linkInfoId, description) {
    const db = await connectDB()
    return db.query(
        `INSERT INTO posts ("userId", "linkId", description)
        VALUES ($1, $2, $3)
        `,
        [userId, linkInfoId, description]
    )
}

export const userRepository = {
    getUser,
    getToken,
    insertLinkInfo,
    insertPost,
}