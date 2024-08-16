import database from "infra/database.js";
import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;"); // de um lado da query um schema é derrubado e no outro é criado e todas as tabelas ficam associadas a um schema e por padrão é usado o public e derrubar o schema principal em forma de cascata
});

//beforeAll(cleanDatabase); // pra rodar a função de forma controlada o jest fornece essa função e antes de rodar a bateria de testes o jest vai rodar essa função

//async function cleanDatabase() {
//  await database.query("drop schema public cascade; create schema public;"); // de um lado da query um schema é derrubado e no outro é criado e todas as tabelas ficam associadas a um schema e por padrão é usado o public e derrubar o schema principal em forma de cascata
//}

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http:localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);

  const response1Body = await response1.json();
  //console.log(response1Body);

  //expect(response1Body).toBe(Array) em teoria o que precisaria é isso mas o jest não aceita isso simples assim
  expect(Array.isArray(response1Body)).toBe(true); // assim é a forma certa
  expect(response1Body.length).toBeGreaterThan(0); // o tamanho do array precisa ser maior do que zero e momentâneamente isso causa erro e é preciso fazer o banco fazer o erro do zero

  const response2 = await fetch("http:localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response2.status).toBe(200);

  const response2Body = await response2.json();
  //console.log(response2Body);

  //expect(response2Body).toBe(Array) em teoria o que precisaria é isso mas o jest não aceita isso simples assim
  expect(Array.isArray(response2Body)).toBe(true); // assim é a forma certa
  expect(response2Body.length).toBe(0); // simulando requisições http por dentro dos testes
});
