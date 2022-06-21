import { userRepository } from './../repositories/userRepository.js';

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  try {
    const { rows: result } = await userRepository.findUserPosts(userId);
    const userPosts = organizeData(result);
    res.status(200).send(userPosts);
  } catch (error) {
    res.sendStatus(500);
  }
};

function organizeData(result) {
  const organizedData = result.map((obj) => {
    const {
      userId,
      userImage,
      userName,
      id,
      postDescription,
      title,
      description,
      url,
      image,
    } = obj;

    return {
      id,
      userId,
      userImage,
      userName,
      postDescription,
      linkInfo: {
        title,
        description,
        url,
        image,
      },
    };
  });

  return organizedData;
}
