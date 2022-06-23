import { repositoryTimeline } from '../repositories/repositoryTimeline.js';
import pageSchema from './schemas/pageSchema.js';

export async function tokenExists(req, res, next) {
    const { authorization } = req.headers;

    const token = authorization?.replace('Bearer ', '').trim();
    if (!token) return res.sendStatus(401);

    try {
        const { rows } = await repositoryTimeline.getToken(token)
        const { userId } = rows[0]
        if (!userId) return res.status(401).send("Invalid token.")
        res.locals.userId = userId
        next()
    } catch (e) {
        return res.status(500).send(e)
    }
}

export async function checkIfUserFollow(req, res, next) {
    const { userId } = res.locals

    try {
        const { rows } = await repositoryTimeline.checkUserFollowed(userId);
        if (rows.length === 0) return res.status(404).send("No followers found");
        next()
    } catch (e) {
        return res.status(500).send(e)

    }
}

export async function pageValidate(req, res, next) {
    const { page } = req.query
    let { error } = pageSchema.validate(page);
    if (error) {
        return res.status(422).send(error);
    } else {
        next();
    }
};