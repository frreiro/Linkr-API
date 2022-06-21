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


export async function checkEditHashtags(req, res, next) {
    const { hashtagsIds } = res.locals
    const { postId } = res.locals.user

    try {

        const { rows: oldHashtags } = await hashtagsRepository.hashtagInPost(postId);
        const oldHashtagsId = []
        for (const obj of oldHashtags) {
            oldHashtagsId.push(obj.hashtagId);
        }
        const deletedHashtag = hashtagsIds
            ? oldHashtagsId.filter((id) => !hashtagsIds.includes(id))
            : oldHashtagsId

        for (const hashtagId of deletedHashtag) {
            await hashtagsRepository.deleteHashtagInPost(postId, hashtagId);
        }
        next()
    } catch (e) {
        return res.status(500).send(e)

    }
}
