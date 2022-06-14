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

export const userRepository = {
    getUser,
    getToken,
}
