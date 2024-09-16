import retry from "async-retry";
import database from "infra/database.js";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;"); // de um lado da query um schema é derrubado e no outro é criado e todas as tabelas ficam associadas a um schema e por padrão é usado o public e derrubar o schema principal em forma de cascata
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
