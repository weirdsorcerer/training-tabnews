import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

//beforeAll(cleanDatabase); pra rodar a função de forma controlada o jest fornece essa função e antes de rodar a bateria de testes o jest vai rodar essa função

test("GET to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http:localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseBody);

  //expect(responseBody).toBe(Array) em teoria o que precisaria é isso mas o jest não aceita isso simples assim
  expect(Array.isArray(responseBody)).toBe(true); // assim é a forma certa

  expect(responseBody.length).toBeGreaterThan(0); // o tamanho do array precisa ser maior do que zero e momentâneamente isso causa erro e é preciso fazer o banco fazer o erro do zero
});
