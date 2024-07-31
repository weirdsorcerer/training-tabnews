import migrationRunner from "node-pg-migrate"; // migrationRunner é uma variável que pode ter qualquer nome
import { join } from "node:path";
import database from "infra/database.js";

// código comentado pra facilitar o uso das opções abaixo
//export default async function migrations(request, response) {
//response.status(200).json({}); se essa linha tiver descomentada o jest vai apontar erro pois o que esperado é um array pelo menos em branco por isso a linha de baixo é necessária
//const migrations = await migrationRunner({}); // como ele é um comando assíncrono que vai até o banco é preciso usar o await essas chaves são objetos {} e o const é o comando para salvar tudo na variável migrations
// executando o comando acima sem configurar nada vai dar erro 500 "error - Error: SASL: SCRAM-SERVER-FIRST-MESSAGE: client password must be a string"
//const migrations = await migrationRunner({
//databaseUrl: process.env.DATABASE_URL,
// executando o comando acima sem configurar vai dar erro "error - Error: Can't get migration files: Error: ENOENT: no such file or directory, scandir 'undefined/'"
//databaseUrl: process.env.DATABASE_URL,
//dryRun: true,
//dir: "infra/migrations", aqui vai falhar em ambientes Windows por isso o método join foi importado do módulo node:path
//dir: join("infra", "migrations"), // esse método vai avaliar o ambiente em que se está sendo executado e vai usar a string correspondente e que vai ser usada pela propriedade dir
////direction: "up", // propriedade obrigatória para evitar o erro undefined que dá sem ela
//
//// código sendo executado
//export default async function migrations(request, response) {
//  if (request.method === "GET") {
//    const migrations = await migrationRunner({
//      databaseUrl: process.env.DATABASE_URL,
//      dryRun: true,
//      dir: join("infra", "migrations"),
//      direction: "up",
//      verbose: true,
//      migrationsTable: "pgmigrations",
//    });
//    return response.status(200).json(migrations);
//  }
//
//  if (request.method === "POST") {
//    const migrations = await migrationRunner({
//      databaseUrl: process.env.DATABASE_URL,
//      dryRun: false,
//      dir: join("infra", "migrations"),
//      direction: "up",
//      verbose: true,
//      migrationsTable: "pgmigrations",
//    });
//    return response.status(200).json(migrations); // a variável é usada como o retorno do endpoint
//    //response.status(200).json([]); // array em branco
//  }
//
//  return response.status(405).end(); // method allowed que cabe melhor pra uma api pois o método existe mas não é permitido
//}
//
//

// código sendo executado
export default async function migrations(request, response) {
  const dbClient = await database.getNewClient(); // aqui é uma instância do banco de dados e aqui substitui aquela connection string ali embaixo e a execução disso vai retornar um client do banco conectado essa config que passa a instância pro node-pg-migrate
  const defaultMigrationOptions = {
    dbClient: dbClient, // conexão aberta que precisa ser fechada lá embaixo, conforme a documentação demonstrou
    //databaseUrl: process.env.DATABASE_URL, essa propriedade antiga com a connection string pois vais ser substitida pelo resultado do novo método criado getNewClient()
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions, // spread do javascript vai espalhar pro migrationRunner tudo o que tem dentro das propriedades desse objeto defaultMigrationOptions
      dryRun: false, // essa opção é usada para rodar no live run
    });

    await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations); // a variável é usada como o retorno do endpoint
    //response.status(200).json([]); // array em branco
  }

  return response.status(405).end(); // method allowed que cabe melhor pra uma api pois o método existe mas não é permitido
}
