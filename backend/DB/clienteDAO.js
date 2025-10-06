//Data Acess Object - DAO
import Cliente from "../Models/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {
  async gravar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO cliente(cli_cpf,cli_nome,cli_telefone,cli_dataNasc,cli_sexo,cli_email,cli_senha) VALUES (?,?,?,?,?,?,?)";
      const parametros = [
        cliente.cpf,
        cliente.nome,
        cliente.telefone,
        cliente.dataNasc,
        cliente.sexo,
        cliente.email,
        cliente.senha,
      ];

      await conexao.execute(sql, parametros);
      conexao.release(); //devolve a coneção para o pool
    }
  }
  async atualizar(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql =
        "UPDATE cliente SET cli_nome = ? , cli_telefone = ? ,cli_dataNasc = ?, cli_sexo = ? , cli_email = ? , cli_senha = ?  WHERE cli_cpf = ? ";
      const parametros = [
        cliente.nome,
        cliente.telefone,
        cliente.dataNasc,
        cliente.sexo,
        cliente.email,
        cliente.senha,
        cliente.cpf,
      ];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const conexao = await conectar();
      const sql = "DELETE FROM cliente WHERE cli_cpf = ?";
      const parametros = [cliente.cpf];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql = "SELECT * from Cliente order by cli_nome ";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let listaClientes = [];
    for (const registro of registros) {
      const cliente = new Cliente(
        registro.cli_cpf,
        registro.cli_nome,
        registro.cli_telefone,
        registro.cli_dataNasc,
        registro.cli_sexo,
        registro.cli_email,
        registro.cli_senha
      );
      listaClientes.push(cliente);
    }
    return listaClientes;
  }
  async consultarCPF(cpf) {
    cpf = cpf || "";
    const conexao = await conectar();
    const sql = "SELECT * from cliente WHERE cli_cpf = ? order by cli_nome";
    const [registros] = await conexao.query(sql, [cpf]);
    await conexao.release();

    let listaClientes = [];
    for (const registro of registros) {
      const cliente = new Cliente(
        registro.cli_cpf,
        registro.cli_nome,
        registro.cli_telefone,
        registro.cli_dataNasc,
        registro.cli_sexo,
        registro.cli_email,
        registro.cli_senha
      );
      listaClientes.push(cliente);
    }
    return listaClientes;
  }
}
