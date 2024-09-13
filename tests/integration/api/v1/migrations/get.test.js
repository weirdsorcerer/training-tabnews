import database from "infra/database.js";
import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;"); // de um lado da query um schema é derrubado e no outro é criado e todas as tabelas ficam associadas a um schema e por padrão é usado o public e derrubar o schema principal em forma de cascata
});

//beforeAll(cleanDatabase); pra rodar a função de forma controlada o jest fornece essa função e antes de rodar a bateria de testes o jest vai rodar essa função

describe("GET /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http:localhost:3000/api/v1/migrations");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      //console.log(responseBody);

      //expect(responseBody).toBe(Array) em teoria o que precisaria é isso mas o jest não aceita isso simples assim
      expect(Array.isArray(responseBody)).toBe(true); // assim é a forma certa

      expect(responseBody.length).toBeGreaterThan(0); // o tamanho do array precisa ser maior do que zero e momentâneamente isso causa erro e é preciso fazer o banco fazer o erro do zero
    });
  });
});
