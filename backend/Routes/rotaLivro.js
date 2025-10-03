import { Router } from "express";
import LivroCtrl from "../Controllers/livroCtrl.js";

const livroRouter = Router();
const livroCtrl = new LivroCtrl();
livroRouter
  .get("/", livroCtrl.consultar)
  .get("/:id", livroCtrl.consultar) //dois tipos de get pois um é para pesquisas gerais e outro para pesquisa específica com parâmetro
  .post("/", livroCtrl.gravar)
  .put("/:id", livroCtrl.atualizar)
  .delete("/:id", livroCtrl.excluir);

export default livroRouter;
