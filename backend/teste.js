import Cliente from "./Models/cliente.js";
import Livro from "./Models/livro.js";

const cliente = new Cliente(
  "350.839.618-57",
  "Ana Paula Hiraiwa",
  "18 98181-2169",
  "2025-08-01",
  "F",
  "hhiraiwa1@hotmail.com",
  "ana123"
);

// await cliente.gravar();
// console.log("Cliente gravado com sucesso");
// console.log("Cliente:" + cliente.nome + "- CPF:" + cliente.cpf);

const livro = new Livro(2, "LIVRO 2 TESTE", "AUTOR TESTE", cliente);
// await livro.gravar();

// console.log("Livro cadastrado com sucesso!");
// console.log(livro.titulo);

//***MÉTODO ALTERAR

// livro.titulo = "teste alterar";
// await livro.alterar();
// console.log("Cliente alterado com sucesso!");

// cliente.nome = "teste alterar";
// await cliente.alterar();
// console.log("Cliente alterado com sucesso!");

//***MÉTODO EXCLUIR ***

// await livro.excluir();
// console.log("livro exluido com sucesso!");

//***MÉTODO CONSULTAR */

const listaClientes = await livro.consultar();
for (const livro of listaClientes) {
  console.log(JSON.stringify(livro));
}

// console.log("clientes consultados.");
