import useSWR from "swr";

//async function fetchStatus() {
async function fetchAPI(key) {
  //const response = await fetch("/api/v1/status"); // substituida a url absoluta por relativa poiso react esta tentando o fetch localmente quando se testa via browser e fora do codespaces ocasionando em erro e a url agora sera relativa pois o webserver vai fornecer a url correta usando a url relativa
  const response = await fetch(key); // substituida a url absoluta por relativa poiso react esta tentando o fetch localmente quando se testa via browser e fora do codespaces ocasionando em erro e a url agora sera relativa pois o webserver vai fornecer a url correta usando a url relativa
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  //const response = useSWR("status", fetchStatus, {
  // refreshInterval: 2000,
  //}); // interface de usuário nunca deve ficar travado por isso não se usa o await aqui um componente sempre deve tá vivo apresentando coisas de forma reativa e nada deve esperar
  // const response = useSWR("/api/v1/status", fetchAPI, {
  //  refreshInterval: 2000,
  //dedupingInterval: 100,
  // }); // interface de usuário nunca deve ficar travado por isso não se usa o await aqui um componente sempre deve tá vivo apresentando coisas de forma reativa e nada deve esperar

  //  console.log(response.isLoading);
  // console.log(response.data);
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  //const response = useSWR("/api/v1/status", fetchAPI, { foi substituído pelo prorcesso de desestruturação bastante usado no mercado
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
    //dedupingInterval: 100,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let DatabaseStatusInformation = "Carregando...";

  if (!isLoading && data) {
    DatabaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.opened_connections}
        </div>
        <div>
          Conexões máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Database</h2>
      <div>{DatabaseStatusInformation}</div>
    </>
  );
}
