import db from '../database/database.connection.js';

export async function getUsersMe(req, res) {
    const { url } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    const checkToken = await db.query(`SELECT * FROM signs WHERE token = $1;`, [token]);
    if (checkToken.rowCount <= 0) return res.status(401).send("url: "+url+" authorization: "+authorization+" Token:"+token);
    const id = checkToken.rows[0].userid;

    const getUser = await db.query(`SELECT * FROM users WHERE id = $1;`, [id]);
    const name = getUser.rows[0].name;

    const sumViews = await db.query(`SELECT SUM(views) FROM urls WHERE userid = $1;`, [id]);

    const getUrls = await db.query(`SELECT (id, short, url, views) FROM urls WHERE userid = $1;`, [id]);

    const urls = getUrls.rows.map( u => {
        return {
            ...u,
            id: u.id,
            shortUrl: u.short,
            url: u.url,
            visitCount: u.views
        }
    });

        const data = {
            id: id,
            name: name,
            visitCount: sumViews,
            shortenedUrls: [ urls ]
        }

        return res.status(200).send(data);

}