import { userRepository } from "../repositories/userRepository.js"

export default async function userdata(req, res){
    const {id : userId} = res.locals.user
    try {
        const user = await userRepository.findUserById(userId)
        const dataUser = {
            id: user.rows[0].id,
            name: user.rows[0].userName,
            image: user.rows[0].image
        }
        res.status(200).send(dataUser)
    } catch (error) {
        console.log(error)
        res.send(404)
    }
    
}