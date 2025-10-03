import express from "express";
import cors from "cors";
import livroRouter from "./Routes/rotaLivro.js";
import clienteRouter from "./Routes/rotaCliente.js";

const hostname = "0.0.0.0";
const porta = 4000;

const app = express();

//consigurar o servidor para a política cors

app.use(
  cors({
    origin: "*",
  })
);

//configurar o servidor para receber dados no formado json
app.use(express.json()); //camada que sabe tratar os dados no formato JSON

app.use("/livro", livroRouter); //camada que sabe atender requisições endpoint curso

app.use("/cliente", clienteRouter); //camada que sabe atender requisições endpoint docente

app.listen(porta, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${porta}`);
});
