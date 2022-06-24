import { followRepository } from "../repositories/followRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const searchGet = async (req, res) => {
    let body = req.body;
    let id = res.locals.userId;
    try{
        const following = await followRepository.followingList(id);
        const result = await userRepository.getUserByName(body.question);
        res.status(200).send(result.rows, following.rows);
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};