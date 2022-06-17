import { hashtagsRepository } from './../repositories/hashtagsRepository.js';

export const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  try {
    const { rows: posts } = await hashtagsRepository.findPostsByHashtagName(hashtag);
    res.status(200).send(posts);
  } catch (error) {
    res.status(500).send(error);
  }
};
