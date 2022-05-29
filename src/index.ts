//#region Imports

import { PurchaseController } from './modules/purchase/controllers/purchase.controller';
import { PurchaseService } from './modules/purchase/services/purchase.service';
import { ReportController } from './modules/report/controllers/report.controller';
import { ReportService } from './modules/report/services/report.service';
import { SaleController } from './modules/sale/controllers/sale.controller';
import { SaleService } from './modules/sale/services/sale.service';

//#endregion

/**
 * Aplicação criada do zero em Express.js (node)
 *
 * Em uma aplicação real de produção seria interessante criar utilizando o framework NestJs, que já contém uma arquitetura
 * e estruturação muito boa, sem contar com o Typeorm para implementar com banco de dados
 *
 * Os modules também são muitos úteis se usarmos a arquitetura de modulos do NestJs dividindo os arquivos
 * e facilitando a manutenção do código
 */

// Configurando variáveis de ambiente
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// TODO: implement real database connections
// TODO: implement Swagger

const createApp = async () => {
  // dependencies
  const purchaseService = new PurchaseService();
  const purchaseController = new PurchaseController(purchaseService);

  const saleService = new SaleService();
  const saleController = new SaleController(saleService);

  const reportService = new ReportService(saleService, purchaseService);
  const reportController = new ReportController(reportService);

  app.get('/', (req: any, res: any) => {
    res.send('<h1>Store API</h1>');
  });

  // controllers
  app.use(purchaseController.getRoutes());
  app.use(saleController.getRoutes());
  app.use(reportController.getRoutes());

  app.listen(process.env.PORT, () => {
    console.log(`Api listening on -> ${ process.env.PORT }`);
  });
};

createApp();
