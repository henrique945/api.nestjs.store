/**
 * Aplicação criada do zero em Express.js (node)
 *
 * Em uma aplicação real de produção seria interessante criar utilizando o framework NestJs, que já contém uma arquitetura
 * e estruturação muito boa, sem contar com o Typeorm para implementar com banco de dados
 */

// Configurando variáveis de ambiente
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// TODO: implement real database connections
// TODO: implement Swagger
const createApp = async () => {
  app.get('/', (req: any, res: any) => {
    res.send('<h1>Store API</h1>');
  });

  app.listen(process.env.PORT, () => {
    console.log(`Api listening on -> ${ process.env.PORT }`);
  });
};

createApp();
