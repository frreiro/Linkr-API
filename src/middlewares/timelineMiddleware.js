import { repositoryTimeline } from '../repositories/repositoryTimeline.js';

export async function tokenExists(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '').trim();
  if (!token) return res.sendStatus(401);

  try {
    const tokenQuery = await repositoryTimeline.getToken(token);
    const tokenResult = tokenQuery.rows[0];
    if (!tokenResult) return res.status(401).send('Invalid token.');
    next();
  } catch (e) {
    return res.status(500).send(e);
  }
}