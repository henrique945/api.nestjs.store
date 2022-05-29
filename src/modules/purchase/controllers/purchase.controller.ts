//#region Imports

import express from 'express';
import { PurchaseProxy } from '../models/purchase.proxy';
import { PurchaseService } from '../services/purchase.service';

//#endregion

export class PurchaseController {

  //#region Constructor

  constructor(
    private readonly purchaseService: PurchaseService,
  ) {}

  //#endregion

  //#region Public Functions

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/purchase', this.listPurchases.bind(this));
    router.get('/purchase/:cod', this.listPurchaseByCode.bind(this));

    return router;
  }

  public async listPurchases(req, res): Promise<PurchaseProxy[]> {
    return await this.purchaseService.listPurchases().then(response => res.json(response));
  }

  public async listPurchaseByCode(req, res): Promise<PurchaseProxy> {
    return await this.purchaseService.listPurchaseByCode(req, res).then(response => res.json(response));
  }

  //#endregion

}
