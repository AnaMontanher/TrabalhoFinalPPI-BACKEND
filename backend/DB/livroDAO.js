//Data Acess Object - DAO
import Cliente from "../Models/cliente.js";
import Livro from "../Models/livro.js";
import conectar from "./conexao.js";

export default class LivroDAO {
  async gravar(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql =
        "INSERT INTO livro(liv_id,liv_titulo,liv_autor,cli_cpf) VALUES (?,?,?,?)";
      const parametros = [
        livro.id,
        livro.titulo,
        livro.autor,
        livro.cliente.cpf,
      ];
      await conexao.execute(sql, parametros);
      conexao.release(); //devolve a coneção para o pool
    }
  }
  async alterar(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql =
        "UPDATE livro SET liv_titulo = ?, liv_autor = ?, cli_cpf = ? WHERE liv_id = ?";
      const parametros = [livro.titulo, livro.autor, livro.cliente, livro.id];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async excluir(livro) {
    if (livro instanceof Livro) {
      const conexao = await conectar();
      const sql = "DELETE FROM livro WHERE liv_id = ?";
      const parametros = [livro.id];
      await conexao.execute(sql, parametros);
      await conexao.release();
    }
  }
  async consultar() {
    const conexao = await conectar();
    const sql =
      "SELECT * from Cliente cli INNER JOIN Livro liv ON cli.cli_cpf = liv.cli_cpf order by cli.cli_nome ASC";
    const [registros] = await conexao.query(sql);
    await conexao.release();

    let listaLivros = [];
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
      const livro = new Livro(
        registro.liv_id,
        registro.liv_titulo,
        registro.liv_autor,
        cliente
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }
  async consultarID(id) {
    id = id || " ";
    const conexao = await conectar();
    const sql =
      "SELECT * from Cliente cli INNER JOIN Livro liv ON cli.cli_cpf = liv.cli_cpf order by cli.cli_nome ASC";
    const [registros] = await conexao.query(sql, [id]);
    await conexao.release();

    let listaLivros = [];
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
      const livro = new Livro(
        registro.liv_id,
        registro.liv_titulo,
        registro.liv_autor,
        cliente
      );
      listaLivros.push(livro);
    }
    return listaLivros;
  }
}
