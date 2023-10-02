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

    const views = await db.query(`SELECT SUM(views) FROM urls WHERE userid = $1;`, [id]);
    const sumViews = views.rows[0].sum;

    const getUrls = await db.query(`SELECT JSON_BUILD_OBJECT('id', id, 'shortUrl', short, 'url', url, 'visitCount', views) AS "json" 
    FROM urls WHERE userid = $1;`, [id]);
    


    const data = {
       id: id,
       name: name,
       visitCount: sumViews,
       shortenedUrls: getUrls.rows.map( u => u.json)
     }
   

   return res.status(200).send(data);

}

export async function ranking(req, res) {


  const getUrls = await db.query(`
  SELECT JSON_BUILD_OBJECT('id', users.id, 'name', users.name, 'linksCount', 
  COUNT(urls.id), 'visitcount', SUM(url.views) AS "json" FROM users JOIN urls ON urls.userid = users.id
  GROUP BY users.id;`);
  


 return res.status(200).send(getUrls.rows);

}