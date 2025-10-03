import ClienteDAO from "../DB/clienteDAO.js";
export default class Cliente {
  #cpf;
  #nome;
  #telefone;
  #dataNasc;
  #sexo;
  #email;
  #senha;

  constructor(
    cpf = "",
    nome = "",
    telefone = "",
    dataNasc = "",
    sexo = "",
    email = "",
    senha = ""
  ) {
    this.#cpf = cpf;
    this.#nome = nome;
    this.#telefone = telefone;
    this.#dataNasc = dataNasc;
    this.#sexo = sexo;
    this.#email = email;
    this.#senha = senha;
  }
  get cpf() {
    return this.#cpf;
  }
  set cpf(cpf) {
    this.#cpf = cpf;
  }

  get nome() {
    return this.#nome;
  }
  set nome(nome) {
    this.#nome = nome;
  }
  get telefone() {
    return this.#telefone;
  }
  set telefone(telefone) {
    this.#telefone = telefone;
  }
  get dataNasc() {
    return this.#dataNasc;
  }

  set dataNasc(dataNasc) {
    this.#dataNasc = dataNasc;
  }
  get sexo() {
    return this.#sexo;
  }
  set sexo(sexo) {
    this.#sexo = sexo;
  }
  get email() {
    return this.#email;
  }
  set email(email) {
    this.#email = email;
  }
  get senha() {
    return this.#senha;
  }
  set senha(senha) {
    this.#senha = senha;
  }

  toString() {
    return `
    CPF: ${this.#cpf}\n
    Nome Completo: ${this.#nome}\n
    Data de Nascimento: ${this.#dataNasc}\n
    Sexo: ${this.sexo}\n
    Telefone: ${this.#telefone}\n
    Email: ${this.#email}\n
    Senha: ${this.senha}
    `;
  }

  toJSON() {
    return {
      cpf: this.#cpf,
      nome: this.#nome,
      telefone: this.#telefone,
      dataNasc: this.#dataNasc,
      sexo: this.#sexo,
      email: this.#email,
      senha: this.#senha,
    };
  }
  async gravar() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.gravar(this);
  }
  async atualizar() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.atualizar(this);
  }
  async excluir() {
    const clienteDAO = new ClienteDAO();
    await clienteDAO.excluir(this);
  }
  async consultar() {
    const clienteDAO = new ClienteDAO();
    return await clienteDAO.consultar(); //único método que RETORNA alguma informação
  }
  async consultarCPF(cpf) {
    const clienteDAO = new ClienteDAO();
    return await clienteDAO.consultarCPF(cpf); //único método que RETORNA alguma informação
  }
}
