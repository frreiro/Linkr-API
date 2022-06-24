import { followRepository } from "../repositories/followRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const searchGet = async (req, res) => {
    let body = req.body;
    let id = res.locals.userId;
    try{
        const following = await followRepository.followingList(id);
        const result = await userRepository.getUserByName(body.question);
        const sendObj = {
            following: following.rows,
            result: result.rows
        }
        res.status(200).send(sendObj);
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};