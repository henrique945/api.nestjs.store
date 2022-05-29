//#region Imports

import express from 'express';
import { PurchaseProxy } from '../../purchase/models/purchase.proxy';
import { SaleProxy } from '../models/sale.proxy';
import { SaleService } from '../services/sale.service';

//#endregion

export class SaleController {

  //#region Constructor

  constructor(
    private readonly saleService: SaleService,
  ) {}

  //#endregion

  //#region Public Functions

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/sale', this.listSales.bind(this));
    router.get('/sale/:cod', this.listSaleByCode.bind(this));

    return router;
  }

  public async listSales(req, res): Promise<SaleProxy[]> {
    return await this.saleService.listSales().then(response => res.json(response));
  }

  public async listSaleByCode(req, res): Promise<PurchaseProxy> {
    return await this.saleService.listSaleByCode(req, res).then(response => res.json(response));
  }

  //#endregion

}
