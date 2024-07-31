import { Client } from "pg";

async function query(queryObject) {
  let client; // não dá pra usar o const aqi porque ao chegar no finally esse client vai estar em outro escopo então ao invés de criar uma variável em um mesmo escoppo é preciso criar ela num escopo acima mas isso cria outro problema que se declarar ela aqui com oconst auqi em cima o valor dela não pode reatribuir lá embaixo por isso a let é usado só pro acesso dela ser compartilhado entre os demais escopos
  //const client = new Client({
  //  host: process.env.POSTGRES_HOST,
  //  port: process.env.POSTGRES_PORT,
  //  user: process.env.POSTGRES_USER,
  //  database: process.env.POSTGRES_DB,
  //  password: process.env.POSTGRES_PASSWORD,
  //  //ssl: process.env.NODE_ENV == "development" ? false : true,
  //  ssl: process.env.NODE_ENV == "production" ? true : false,
  // }); //sync

  //console.log('Credenciais do Postgres:"', {
  // host: process.env.POSTGRES_HOST,
  //port: process.env.POSTGRES_PORT,
  //user: process.env.POSTGRES_USER,
  //database: process.env.POSTGRES_DB,
  //password: process.env.POSTGRES_PASSWORD,
  //});

  try {
    client = await getNewClient();
    //await client.connect(); //async
    const result = await client.query(queryObject); // async
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end(); // não deixar a conexão pendurada/aberta
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    //ssl: process.env.NODE_ENV == "development" ? false : true,
    ssl: process.env.NODE_ENV == "production" ? true : false,
  }); //sync

  await client.connect();
  return client;
}

export default {
  //query: query,
  //getNewClient: getNewClient
  // comentei essas linhas pra mostrar que dá pra exportar assim também ao invés de ficar repetindo os nomes pois quando esse objeto for exportado tanto a propriedade quanto o valor vai ter o mesmo valor
  query,
  getNewClient,
};
