import { searchSchema } from "./schemas/searchSchema.js";

export const searchMiddleware = async (req, res, next) => {
    let body = req.body;
    let { error } = searchSchema.validate(body);
    if(!error){
        next();
    } else {
        res.sendStatus(422);
    }
};