import joi from "joi"
import bcrypt from "bcrypt"
import { repositoryLogIn } from "../repositories/repositoryLogin.js"

export async function validateData(req, res, next){
    
    try {
        const schema = joi.object({
            email: joi.string().email().min(5).required(),
            password: joi.string().required()
        })

        await schema.validateAsync(req.body)

        next()

    } catch (error) {
        res.status(401).send("Você não enviou todas as informações")
    }
}

export async function  validateUser(req, res, next){
    const {email} = req.body

    try {
        const user = await repositoryLogIn.searchEmail(email)
        
        if(user.rows.length !== 1){
            return res.status(401).send("Endereço de email não cadastrado")
        }
        
        
        res.locals.user = user.rows[0]
        next()
        
    } catch (error) {
        if(error.isJoi){
            return res.status(401).send("Dados enviados fora do padrão esperado")
        }
        res.send(error)
    }
}

export async function validatePass(req, res, next){
    const {password} = req.body
    const {user} = res.locals

    try {
        const passCorrect = bcrypt.compareSync(password, user.password)
        if(!passCorrect && password !== user.password){
            return res.status(401).send("Senha incorreta")
        }
        next()    
    } catch (error) {
        res.send(error)
    }
}