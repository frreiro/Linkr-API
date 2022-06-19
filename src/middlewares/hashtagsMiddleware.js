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
        const hashtagsIds = []
        for (const hashtag of hashtags) {
            const { rows: idObj } = await hashtagsRepository.checkExistHashtag(hashtag);
            if (idObj.length !== 0) hashtagsIds.push(idObj[0].id)
            else {
                const { rows: [newHashtag] } = await hashtagsRepository.insertHashtag(hashtag);
                hashtagsIds.push(newHashtag.id)
            }
        }
        res.locals.hashtagsIds = hashtagsIds
        next()
    } catch (e) {
        return res.status(500).send(e)
    }

}

