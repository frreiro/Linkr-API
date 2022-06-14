import { repositoryTimeline } from "../repositories/repositoryTimeline.js";


export async function tokenValidate(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    try {
        const result = await repositoryTimeline.getUserByToken(token)
        if (!result.rows[0]) return res.sendStatus(401);
        next();
    } catch (e) {
        res.sendStatus(500);
    }
}