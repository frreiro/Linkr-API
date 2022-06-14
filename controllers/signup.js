import connectDB from "../config/bank.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
    let body = req.body;
    try{
        const db = await connectDB();
        let verify = db.query("SELECT * FROM users WHERE email = $1", [body.email]);
        if(verify.rows.length === 0){
            let password = bcrypt.hashSync(body.password, 10);
            await db.query("INSERT INTO users (email, username, password, image) VALUES ($1, $2, $3, $4)", [body.email, body.username, password, body.image]);
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    } catch(e){
        res.sendStatus(500);
        console.log(e);
    }
};