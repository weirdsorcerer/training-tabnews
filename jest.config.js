const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development", // o objeto de configuração desse método dotenv especifica o caminho em que está o arquivo de variável e o dotenv vai injetar o conteúdo do arquivo .env.development dentro do process.env
});

const { default: nextJest } = require("next/jest");
//const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
}); // é uma factory de funções
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"], //o root dir é um placeholder que informa a raiz do projeto
  testTimeout: 60000,
});
module.exports = jestConfig;
