import orchestrator from "../orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http:localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  //console.log(responseby);
  //expect(responseBody.updated_at).toBeDefined(); // espero o response by vindo da propriedade updated_at esteja definido

  //new Date(responseBody.updated_at).toISOString();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt); // se na propriedade updated_at chegar o valor null não vai ser igual ao unix timestamp
  //console.log(parsedUpdatedAt);

  expect(responseBody.dependencies.database.version).toEqual("16.0");
  //console.log(responseBody);
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1); // 1 porque se tiver mais de uma pode ter uma conexão vazando
});
