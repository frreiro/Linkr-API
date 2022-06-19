import { userRepository } from './../repositories/userRepository.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows: user } = await userRepository.findUserById(id);
    if (!user[0]) return res.sendStatus(404);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getCurrentUserInfos = async (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.sendStatus(401);
  try {
    const result = await userRepository.findCurrentUserInfos(token);
    const currentUserInfos = result.rows[0];
    if (!currentUserInfos) return res.sendStatus(404);
    res.status(200).send(currentUserInfos);
  } catch (error) {
    res.status(500).send(error);
  }
};
