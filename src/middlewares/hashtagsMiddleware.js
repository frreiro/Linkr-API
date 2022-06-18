export async function searchHashtag(req, res, next) {
    const { description } = req.body

    const hashtags = []
    description.split(" ").filter((char) => {
        if (char.includes('#')) {
            hashtags.push(char.replace('#', ""))
        }
    })

    // try {
    //     await 
    // } catch (e) {

    // }

}