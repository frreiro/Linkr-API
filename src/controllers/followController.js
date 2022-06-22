import { followRepository } from '../repositories/followRepository.js';

export async function getFollowStatus(req, res) {
  const { currentUserId, followedUserId } = req.body;
  try {
    let followStatus = false;
    const result = await followRepository.checkFollowStatus(
      currentUserId,
      followedUserId
    );
    if (result.rowCount !== 0) followStatus = true;
    res.status(200).send(followStatus);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

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
