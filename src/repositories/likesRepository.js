import connectDB from "../config/database.js"

const db = await connectDB()

async function getUser(token) {
    return db.query(`SELECT users.id from sessions
                     JOIN users ON users.id = sessions."userId"
                     WHERE token=$1 AND valid=true`, [token])

}

async function findPost(id){
    return db.query(`SELECT * FROM posts WHERE id=$1`,[id])
}

async function insertLike(userId, postId){
    return db.query(`INSERT INTO "postsLikes" ("userId", "postId") VALUES ($1, $2)`,[userId, postId])
}

async function likeAvailable(userId, postId){
    return db.query(`SELECT * FROM "postsLikes" WHERE "userId"=$1 AND "postId"=$2`,[userId, postId])
}

export const likesRepository = {
    getUser,
    findPost,
    insertLike,
    likeAvailable
}