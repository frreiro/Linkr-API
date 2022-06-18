import { repositoryTimeline } from "../repositories/repositoryTimeline.js";

export async function postsData(req, res) {
    try {
        const result = await repositoryTimeline.getPost();
        const arrPost = result.rows
        res.status(200).send(_mapPostData(arrPost));
    } catch (e) {
        console.log(e)
        res.sendStatus(500);
    }
}

function _mapPostData(rows) {
    const newRows = rows.map((post) => {
        const { postId, userId, userImage, userName, postDescription, title, description, url, image } = post
        const newPost = {
            postId,
            userId,
            userImage,
            userName,
            postDescription,
            linkInfo: {
                title,
                description,
                url,
                image
            }
        }
        return newPost
    })

    return newRows;
}