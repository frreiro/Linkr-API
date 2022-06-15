import urlMetadata from 'url-metadata';

import { userRepository } from '../repositories/userRepository.js';

export async function createPost(req, res) {
  const { description } = req.body;
  const { user } = res.locals;
  try {
    const link = await urlMetadata('https://github.com/frreiro/Linkr');
    const linkQuery = await userRepository.insertLinkInfo(link);
    const linkResult = linkQuery.rows[0];

    const postQuery = await userRepository.insertPost(user.id, linkResult.id, description);

    return res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
  }
}
