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
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const checkToken = await db.query(`SELECT * FROM signs WHERE token = $1;`, [token]);
    if (checkToken.rowCount <= 0) return res.status(401).send("url: "+url+" authorization: "+authorization+" Token:"+token);


    const shortUrl = nanoid();
    const userId = checkToken.rows[0].userid;

    try{

        await db.query(`INSERT INTO urls (url, short, userid) VALUES ($1, $2, $3);`,
        [url, shortUrl, userId]);


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

export async function getUrl(req, res) {
    const { id } = req.params;

    const checkUrl = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    if (checkUrl.rowCount <= 0) return res.sendStatus(404);

    const data = {
        id: id,
        shortUrl: checkUrl.rows[0].short,
        url: checkUrl.rows[0].url
    }

    return res.status(200).send(data);

}

export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;

    const checkUrl = await db.query(`SELECT * FROM urls WHERE short = $1;`, [shortUrl]);
    if (checkUrl.rowCount <= 0) return res.sendStatus(404);

    const count = parseInt(checkUrl.rows[0].views) + 1;

    try {
        await db.query(`UPDATE urls SET views = $1 WHERE short = $2;`, [count, shortUrl]);
        res.redirect(checkUrl.rows[0].url);
    } catch (err) {
        return res.status(500).send(err.message);
    }

}

export async function deleteUrl(req, res) {
    const { id } = req.params;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const checkToken = await db.query(`SELECT * FROM signs WHERE token = $1;`, [token]);
    if (checkToken.rowCount <= 0) return res.status(401).send("url: "+url+" authorization: "+authorization+" Token:"+token);

    const userId = checkToken.rows[0].userid;

    const checkUrl2 = await db.query(`SELECT * FROM urls WHERE id = $1 AND userid = $2;`, [id, userId]);
    if (checkUrl2.rowCount <= 0) return res.sendStatus(401);


    const checkUrl1 = await db.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
    if (checkUrl1.rowCount <= 0) return res.sendStatus(404);


    try{

        await db.query(`DELETE FROM urls WHERE id = $1;`, [id]);
        return res.sendStatus(204);

    }catch(err){
        return res.status(500).send(err.message);
    }

}


