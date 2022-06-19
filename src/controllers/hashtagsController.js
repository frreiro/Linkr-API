import { hashtagsRepository } from './../repositories/hashtagsRepository.js';
import { _mapPostData } from './timelineController.js';

export const getPostsByHashtag = async (req, res) => {
  const { hashtag } = req.params;
  try {
    const { rows: posts } = await hashtagsRepository.findPostsByHashtagName(hashtag);
    res.status(200).send(_mapPostData(posts));
  } catch (error) {
    res.status(500).send(error);
  }
};


export const getHashtag = async (req, res) => {
  try {
    const { rows: hashtags } = await hashtagsRepository.getHashtagName();
    res.status(200).send(hashtags);
  } catch (e) {
    res.status(500).send(e);
  }
}