import { userRepository } from "../repositories/userRepository.js";

export const searchGet = async (req, res) => {
    let body = req.body;
    try{
        const result = await userRepository.getUserByName(body.question);
        res.status(200).send(result.rows);
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};