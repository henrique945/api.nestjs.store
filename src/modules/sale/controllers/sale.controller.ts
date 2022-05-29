import express from 'express';
import { getSaleInfo } from '../../../infra/database/database';
import { PurchaseProxy } from '../../purchase/models/purchase.proxy';
import { SaleProxy } from '../models/sale.proxy';

export class SaleController {

  //#region Public Properties

  public saleData: SaleProxy[] = getSaleInfo();

  //#endregion

  //#region Public Functions

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/sale', this.listSales.bind(this));
    router.get('/sale/:cod', this.listSaleByCode.bind(this));

    return router;
  }

  public listSales(req, res): SaleProxy[] {
    return res.json(this.saleData);
  }

  public listSaleByCode(req, res): PurchaseProxy {
    const sale = this.saleData.find(i => i.cod === req.params.cod);

    if (!sale)
      return res.json({ error: 'Venda não encontrada.' });

    return res.json(sale);
  }

  //#endregion

}
