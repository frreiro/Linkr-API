import connectDB from "../config/database.js"

const db = await connectDB()

async function addComment(postId, userId, comment){
    return await db.query(`INSERT INTO comments ("userId", "postId", comment) VALUES ($1, $2, $3)`,[userId, postId, comment])
}

async function findComments(postId){
    return await db.query(` SELECT comment, "userName", image FROM comments
                            JOIN users ON "userId" = users.id
                            WHERE "postId" = $1`,[postId])
}

export const commentsRepository = {
    addComment,
    findComments
}