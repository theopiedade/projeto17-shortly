import db from '../database/database.connection.js';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';

function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }

export async function urlShort(req, res) {
    const { url } = req.body;
    const { authorization } = req.header;
    const token = authorization?.replace('Bearer ', '');

    const checkToken = await db.query(`SELECT * FROM signs WHERE token = $1;`, [token]);
    if (checkUser.rowCount <= 0) return res.sendStatus(401);

    //if (!isValidUrl(url)) return res.sendStatus(422);

    const shortUrl = nanoid();


    try{

        await db.query(`INSERT INTO urls (url, short) VALUES ($1, $2);`,
        [url, shortUrl]);


        const checkID = await db.query(`SELECT * FROM urls WHERE short = $1;`, [shortUrl]);
        const id = checkID.rows[0].id

        const data = {
            id: id,
            shortUrl: shortUrl
        }

        return res.status(201).send(data);

    }catch(err){
        return res.status(500).send(err.message);
    }

}
