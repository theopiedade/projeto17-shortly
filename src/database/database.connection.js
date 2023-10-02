import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const configDatabase = {
    connectionString: process.env.DATABASE_URL,
}

if (process.env.NODE_ENV === "production") configDatabase.ssl = true;

const db = new Pool(configDatabase);

db.connect()
.then(() => {
  console.log("Conexão com banco OK");
})
.catch((err) => {
  console.error("Erro na conexão com o banco");
})


export default db;