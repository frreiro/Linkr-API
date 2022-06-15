//[x]  devo receber um body no formato {email, password}
//[x]  devo validar se as informações passadas estão num formato aceitavel
//[x]  devo verificar se as infos passadas conferem com as q estão na tabela de registros
//[]  devo gerar um token para esse usuário
import { v4 as uuid } from 'uuid'

import connectDB from "../config/bank.js";
import { repositoryLogIn } from "../repositories/repositoryLogin.js";


export async function signIn(req, res){
    const {user} = res.locals

    try {
        const token = uuid()

        await repositoryLogIn.insertSession(user.id, token)

        res.send(token)

    } catch (error) {
        console.log(error)
        res.status(422).send(error)
    }
}