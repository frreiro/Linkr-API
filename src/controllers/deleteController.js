import { likesRepository } from "../repositories/likesRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const deletePost = async (req, res) => {
    const postId = req.params.id
    try{
        await likesRepository.deletePost(postId);
    } catch(e){
        res.sendStatus(500)
        console.log(e);
    }
};