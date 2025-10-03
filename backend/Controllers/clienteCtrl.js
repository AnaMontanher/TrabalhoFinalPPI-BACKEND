import Cliente from "../Models/cliente.js";

export default class ClienteCrtl {
  gravar(requisicao, resposta) {
    resposta.type("application/json");
    if (requisicao.method === "POST" && requisicao.is("application/json")) {
      const dados = requisicao.body;
      if (
        dados.cpf &&
        dados.nome &&
        dados.telefone &&
        dados.dataNasc &&
        dados.sexo &&
        dados.email &&
        dados.senha
      ) {
        const cliente = new Cliente(
          dados.cpf,
          dados.nome,
          dados.telefone,
          dados.dataNasc,
          dados.sexo,
          dados.email,
          dados.senha
        );
        cliente
          .gravar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cliente cadastrado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao cadastrar o cliente: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Preencha todas as informações do cliente: CPF,NOME,TELEFONE,DATANASC,SEXO,EMAIL,SENHA.",
        });
      }
    } else {
      //CODIGO 400 o erro é do usuário que fez a requisição
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida. ",
      });
    }
  }

  atualizar(requisicao, resposta) {
    resposta.type("application/json");
    if (
      (requisicao.method === "PUT" || requisicao.method === "PATCH") &&
      requisicao.is("application/json")
    ) {
      const dados = requisicao.body;
      const cpf = requisicao.params.cpf;
      if (
        cpf &&
        dados.nome &&
        dados.telefone &&
        dados.dataNasc &&
        dados.sexo &&
        dados.email &&
        dados.senha
      ) {
        const cliente = new Cliente(
          cpf,
          dados.nome,
          dados.telefone,
          dados.dataNasc,
          dados.sexo,
          dados.email,
          dados.senha
        );
        cliente
          .atualizar()
          .then(() => {
            resposta.status(200).json({
              status: true,
              mensagem: "Cliente atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o cliente: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem:
            "Informe todos os dados do Cliente: NOME, TELEFONE,DATANASC, SEXO, EMAIL. O CPF deve ser informado na URL.",  
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida.",
      });
    }
  }

  excluir(requisicao, resposta) {
    if (requisicao.method === "DELETE") {
      const cpf = requisicao.params.cpf;
      if (cpf) {
        const cliente = new Cliente();
        cliente
          .consultarCPF(cpf)
          .then((listaClientes) => {
            const clienteEncontrado = listaClientes[0];
            if (clienteEncontrado) {
              clienteEncontrado
                .excluir()
                .then(() => {
                  resposta.status(200).json({
                    status: true,
                    mensagem: "Cliente excluído com sucesso!",
                  });
                })
                .catch((erro) => {
                  resposta.status(500).json({
                    status: false,
                    mensagem: "Erro ao excluir o cliente: " + erro.message,
                  });
                });
            } else {
              resposta.status(400).json({
                status: false,
                mensagem: "Cliente não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Não foi possível consultar clientes: " + erro.message,
            });
          });
      } else {
        resposta.status(400).json({
          status: false,
          mensagem: "Informe o CPF do cliente.",
        });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida.",
      });
    }
  }

  consultar(requisicao, resposta) {
    if (requisicao.method === "GET") {
      const cpf = requisicao.params.cpf;
      const cliente = new Cliente();
      if (cpf) {
        cliente
          .consultarCPF(cpf)
          .then((listaClientes) => {
            if (listaClientes.length > 0) {
              resposta.status(200).json({
                status: true,
                mensagem: "Consulta realizada com sucesso!",
                cliente: listaClientes[0],
              });
            } else {
              resposta.status(404).json({
                status: false,
                mensagem: "Cliente não encontrado.",
              });
            }
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar cliente: " + erro.message,
            });
          });
      } else {
        cliente
          .consultar()
          .then((listaClientes) => {
            resposta.status(200).json({
              status: true,
              mensagem: "Clientes consultados com sucesso!",
              clientes: listaClientes,
            });
          })
          .catch((erro) => {
            resposta.status(500).json({
              status: false,
              mensagem: "Erro ao consultar lista de clientes: " + erro.message,
            });
          });
      }
    } else {
      resposta.status(400).json({
        status: false,
        mensagem: "Requisição inválida.",
      });
    }
  }
}
