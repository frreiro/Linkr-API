import { likesRepository } from "../repositories/likesRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const deletePost = async (req, res) => {
    const userId = res.locals.user
    const postId = req.params.id
    try{
        let validate = await userRepository.checkPostOwner(postId, userId);
        if(validate.rows[0] === undefined){
            res.sendStatus(401);
        } else {
            await likesRepository.deletePost(postId);
        }
    } catch(e){
        res.sendStatus(500)
        console.log(e);
    }
};