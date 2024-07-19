import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  }); //sync
  await client.connect(); //async
  try {
    const result = await client.query(queryObject); // async
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    await client.end(); // não deixar a conexão pendurada/aberta
  }
}

export default {
  query: query,
};
