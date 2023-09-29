import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';

export async function signUp(req, res) {
    const { name, email, password, confirmPassword  } = req.body;

    const checkEmail = await db.query(`SELECT * FROM users WHERE "email" = $1;`, [email]);
    if (checkEmail.rows[0]) return res.sendStatus(409);
    if (password !== confirmPassword) return res.sendStatus(409);

    const passwordCrypt = bcrypt.hashSync(password, 10);

    try{

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
        [name, email, passwordCrypt]);

        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);
    }

}

export async function signIn(req, res) {
    const { email, password } = req.body;

    const checkEmail = await db.query(`SELECT * FROM users WHERE "email" = $1;`, [email]);
    if (checkEmail.rows[0]) return res.sendStatus(409);
    if (password !== confirmPassword) return res.sendStatus(409);

    try{

        await db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3);`,
        [name, email, password, confirmPassword]);

        return res.sendStatus(201);

    }catch(err){
        return res.status(500).send(err.message);
    }

}