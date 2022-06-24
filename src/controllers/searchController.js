import { followRepository } from "../repositories/followRepository.js";
import { userRepository } from "../repositories/userRepository.js";

export const searchGet = async (req, res) => {
    let body = req.body;
    let id = res.locals.userId;
    try{
        const following = await followRepository.followingList(id);
        const result = await userRepository.getUserByName(body.question);
        let followingArray = [];
        for(let i=0; i < following.rows.length; i++){
            followingArray.push(following.rows[i].followedId);
        }
        const sendObj = {
            following: followingArray,
            result: result.rows
        }
        res.status(200).send(sendObj);
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};