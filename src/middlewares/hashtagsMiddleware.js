import { hashtagsRepository } from "../repositories/hashtagsRepository.js"

export async function searchHashtag(req, res, next) {
    const { description } = req.body

    const hashtags = []
    description.split(" ").filter((char) => {
        if (char.includes('#')) {
            hashtags.push(char.replace('#', ""))
        }
    })
    if (hashtags.length === 0) return next()

    try {
        await hashtagsRepository.insertHashtag(hashtags);
        next()
    } catch (e) {
        return res.status(500).send(e)
    }

}