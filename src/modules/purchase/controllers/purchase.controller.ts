//#region Imports

import express from 'express';
import { getPurchaseInfo } from '../../../infra/database/database';
import { PurchaseProxy } from '../models/purchase.proxy';

//#endregion

// TODO: ideal é passar a lógica dos controllers para os services (quebrando em mais uma etapa)
export class PurchaseController {

  //#region Public Properties

  public purchaseData: PurchaseProxy[] = getPurchaseInfo();

  //#endregion

  //#region Public Functions

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/purchase', this.listPurchases.bind(this));
    router.get('/purchase/:cod', this.listPurchaseByCode.bind(this));

    return router;
  }

  public listPurchases(req, res): PurchaseProxy[] {
    return res.json(this.purchaseData);
  }

  public listPurchaseByCode(req, res): PurchaseProxy {
    const purchase = this.purchaseData.find(i => i.cod === req.params.cod);

    if (!purchase)
      return res.json({ error: 'Compra não encontrada.' });

    return res.json(purchase);
  }

  //#endregion

}
