import connectDB from "../config/database.js"

const db = await connectDB()

async function addComment(postId, userId, comment){
    return await db.query(`INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3)`,[userId, postId, comment])
}

async function findComments(postId){
    return await db.query(` SELECT comment, "userName", image, "postId", p."userId" AS published, u.id AS userCom  FROM comments
                            JOIN posts p ON p.id = comments."postId"
                            JOIN users u ON comments."userId" = u.id
                            WHERE "postId" = $1`,[postId])
}

async function findfollowing(userId){
    return await db.query(`SELECT "followedId" AS follow FROM followers WHERE "userId"=$1`,[userId])
}

export const commentsRepository = {
    addComment,
    findComments,
    findfollowing
}