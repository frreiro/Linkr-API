import { followRepository } from '../repositories/followRepository';

export async function postFollow(req, res) {
  const { currentUserId, followedUserId } = req.body;
  try {
    await followRepository.insertFollow(currentUserId, followedUserId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

export async function removeFollow(req, res) {
  const { currentUserId, followedUserId } = req.body;
  try {
    await followRepository.deleteFollow(currentUserId, followedUserId);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
