import Livro from "../Models/livro.js";

export default class LivroCrtl {
  //HTTP POST
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (dados.titulo && dados.autor && dados.cliente) {
        const livro = new Livro(null, dados.titulo, dados.autor, dados.cliente);
        livro
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Livro cadastrado com sucesso.",
              livro: livro,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao gravar o livro: " + erro.message,
            });
          }); // gravar é um método assíncrono
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe todos os dados do Livro(TITULO,AUTOR,CLIENTE)",
        });
      }
    } else {
      //CODIGO 400 o erro é do usuário que fez a requisição
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //HTTP PUT
  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const id = requisicao.params.id;
      if (id && dados.titulo && dados.autor && dados.cliente) {
        const livro = new Livro(id, dados.titulo, dados.autor, dados.cliente);
        livro
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              message: "Livro atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar os dados do livro: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do livro: TITULO, AUTOR E CPF DO CLIENTE. O ID deve ser informado na url.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //HTTP DELETE
  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE") {
      const id = requisicao.params.id;
      if (id) {
        const livro = new Livro();
        livro
          .consultarID(id)
          .then((listaLivros) => {
            const cursoEncontrado = listaLivros[0];
            if (cursoEncontrado) {
              cursoEncontrado
                .excluir()
                .then(() => {
                  resposta.status(200).json({
                    status: true,
                    mensagem: "Livro excluído com sucesso.",
                  });
                })
                .catch((erro) => {
                  resposta.status(500).json({
                    status: false,
                    mensagem:
                      "Erro ao excluir livro cadastrado: " + erro.message,
                  });
                });
            } else {
              resposta.status(400).json({
                status: false,
                mensagem: "Livro não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar livro cadastrado: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe ID do livro.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }

  //HTTP GET
  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const id = requisicao.params.id;
      const livro = new Livro();
      if (id) {
        livro
          .consultarID(id)
          .then((listaLivros) => {
            if (listaLivros.length > 0) {
              resposta.status(200).json({
                status: true,
                mensagem: "Consulta realizada com sucesso!",
                livro: listaLivros[0],
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Livro não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar o livro: " + erro.message,
            });
          });
      } else {
        livro
          .consultar()
          .then((listaLivros) => {
            resposta.status(200).json({
              status: true,
              mensagem: "Livros consultados com sucesso!",
              livros: listaLivros,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar livros: " + erro.message,
            });
          });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida",
      });
    }
  }
}
