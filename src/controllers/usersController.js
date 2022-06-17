import { userRepository } from './../repositories/userRepository.js';

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userRepository.findUserById(id);
    if (!user) return res.sendStatus(404);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
