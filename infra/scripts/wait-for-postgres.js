const { exec } = require("node:child_process");

function checkPostgres() {
  //exec("docker exec postgres-dev pg_isready", handleReturn);
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    //console.log(stdout);
    if (stdout.search("accepting connections") === -1) {
      //console.log("Não está aceitando conexões ainda.");
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    console.log("\n🟢! Postgres is up and running\n");
  }
}

process.stdout.write("\n\n🔴! Aguardando Postgres aceitar conexões");
checkPostgres();
