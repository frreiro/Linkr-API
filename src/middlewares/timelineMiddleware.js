import { repositoryTimeline } from '../repositories/repositoryTimeline.js';

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