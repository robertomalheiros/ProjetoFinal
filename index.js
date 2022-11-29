//ARQUIVO PRINCIPAL
import express from "express";
import * as dotenv from "dotenv";
import { uuid } from "uuidv4";
//habilitar o servidor a ter variáveis de ambiente
dotenv.config();

//instanciar a variável que vai ficar responsável pelo nosso servidor -> app
const app = express();

//configurar o servidor para aceitar enviar e receber arquivos em JSON
app.use(express.json());

//banco de dados
const bancoDados = [
  {
    id: "e27ab2b1-cb91-4b18-ab90-5895cc9abd29",
    documentName: "Licitação Enap - Curso Web Dev",
    status: "Em andamento",
    details:
      "Processo para capacitação de servidores públicos em desenvolvimento de aplicações na WEB. Parceria com Ironhack",
    dateInit: "28/11/2022",
    comments: [
      "Processo aberto",
      "Processo partiu para as partes assinarem",
      "Processo agora está em análise final",
      "Processo já tem data final",
    ],
    dateEnd: "16/12/2022",
    setor: "enap",
  },
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Notebooks",
    status: "Em andamento",
    details: "Processo de licitação para compra de notebooks",
    dateInit: "30/11/2022",
    comments: ["Processo em aberto e sem previsão de conclusão"],
    dateEnd: "",
    setor: "tre",
  },
  ,
  {
    id: "ee5999d7-02e9-4b3d-a1ab-f067eef54173",
    documentName: "Licitação Compras - Ar Condicionado",
    status: "Finalizado",
    details: "Processo de licitação para compra de ar-condicionado",
    dateInit: "15/11/2022",
    comments: ["Processo em aberto", "Processo finalizado"],
    dateEnd: "25/11/2022",
    setor: "trj",
  },
];

app.get("/all", (req, res) => {
  return res.status(200).json(bancoDados);
});

//CREATE
app.post("/create", (req, res) => {
  const form = req.body;
  bancoDados.push(form);
  return res.status(201).json(bancoDados);
});

//EDIT
app.put("/edit/:id", (req, res) => {
  const { id } = req.params;
  const form = req.body;
  const editById = bancoDados.find((pross) => pross.id === id);
  const index = bancoDados.indexOf(editById);
  bancoDados[index] = form;

  return res.status(200).json(bancoDados);
});

//DELETE
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const deleteById = bancoDados.find((pross) => pross.id === id);
  const index = bancoDados.indexOf(deleteById);
  bancoDados.splice(index, 1);

  return res.status(200).json(bancoDados);
});

//BUSCA PROCESSO
app.get("/process/:id", (req, res) => {
  const { id } = req.params;
  const processo = bancoDados.find((pross) =>
    pross.id === id ? pross.documentName : null
  );
  return res.status(200).json(processo);
});

//ADD COMENTÁRIO
app.put("/addComment/:id", (req, res) => {
  const { id } = req.params;
  const comentario = req.body.comments;
  const processo = bancoDados.find((pross) => pross.id === id);
  processo.comments.push(comentario);
  return res.status(200).json(processo.comments);
});

//BUSCA OPEN
app.get("/status/open", (req, res) => {
  const abertos = [];
  const processo = bancoDados.filter((processo) =>
    processo.status === "Em andamento" ? abertos.push(processo) : null
  );
  return res.status(200).json(abertos);
});

//BUSCA CLOSE
app.get("/status/close", (req, res) => {
  const fechados = [];
  const processo = bancoDados.filter((processo) =>
    processo.status === "Finalizado" ? fechados.push(processo) : null
  );
  return res.status(200).json(fechados);
});

//BUSCA SETOR
app.get("/setor/:setor", (req, res) => {
  const { setor } = req.params;
  const setores = [];
  const processo = bancoDados.map((processo) =>
    processo.setor === setor ? setores.push(processo) : null
  );
  return res.status(200).json(setores);
});

//BUSCA RANDOM
app.get("/random", (req, res) => {
  const rand = parseInt(Math.random() * bancoDados.length);
  return res.status(200).json(bancoDados[rand]);
});

app.listen(process.env.PORT, () => {
  console.log(`Rodando em http://localhost:${process.env.PORT}`);
});
