import { Router } from "express";
import ClienteCtrl from "../Controllers/clienteCtrl.js";

const clienteRouter = Router();
const clienteCtrl = new ClienteCtrl();
clienteRouter
  .get("/", clienteCtrl.consultar)
  .get("/:cpf", clienteCtrl.consultar) //dois tipos de get pois um é para pesquisas gerais e outro para pesquisa específica com parâmetro
  .post("/", clienteCtrl.gravar)
  .put("/:cpf", clienteCtrl.atualizar)
  .delete("/:cpf", clienteCtrl.excluir);

export default clienteRouter;
