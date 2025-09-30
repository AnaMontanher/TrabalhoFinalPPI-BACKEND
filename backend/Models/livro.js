export default class Livro {
  #id;
  #titulo;
  #autor;
  #cliente;

  constructor(id = 0, titulo = "", autor = "", cliente = "") {
    this.#id = id;
    this.#titulo = titulo;
    this.#autor = autor;
    this.#cliente = cliente;
  }
  get id() {
    return this.#id;
  }
  set id(id) {
    this.#id = id;
  }

  get titulo() {
    return this.#titulo;
  }
  set titulo(titulo) {
    this.#titulo = titulo;
  }
  get autor() {
    return this.#autor;
  }
  set autor(autor) {
    this.#autor = autor;
  }
  get cliente() {
    return this.#cliente;
  }

  set cliente(cliente) {
    this.#cliente = cliente;
  }

  toString() {
    return `
    id: ${this.#id}\n
    Titulo: ${this.#titulo}\n
    Autor: ${this.#autor}\n
    Cliente: ${this.#cliente}   
    `;
  }

  toJSON() {
    return {
      id: this.#id,
      titulo: this.#titulo,
      autor: this.#autor,
      cliente: this.#cliente,
    };
  }
  async gravar() {
    const livroDAO = new LivroDAO();
    await livroDAO.gravar(this);
  }
  async alterar() {
    const livroDAO = new LivroDAO();
    await livroDAO.alterar(this);
  }
  async excluir() {
    const livroDAO = new LivroDAO();
    await livroDAO.excluir(this);
  }
  async consultar() {
    const livroDAO = new LivroDAO();
    return await livroDAO.consultar(); //único método que RETORNA alguma informação
  }
  async consultarID(id) {
    const livroDAO = new LivroDAO();
    return await livroDAO.consultarID(id); //único método que RETORNA alguma informação
  }
}
