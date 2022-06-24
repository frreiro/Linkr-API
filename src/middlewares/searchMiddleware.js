import { searchSchema } from "./schemas/searchSchema.js";
import { repositoryTimeline } from "../repositories/repositoryTimeline.js";

export const searchMiddleware = async (req, res, next) => {
    let body = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);
    let { error } = searchSchema.validate(body);
    if(!error){
        try{
            const { rows } = await repositoryTimeline.getToken(token)
            const { userId } = rows[0]
            if (!userId) return res.status(401).send("Invalid token.")
            res.locals.userId = userId
            next()
        } catch(e){
            res.sendStatus(500);
            console.log(e);
        }
    } else {
        res.sendStatus(422);
    }
};