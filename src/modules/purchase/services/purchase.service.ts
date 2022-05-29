//#region Imports

import { getPurchaseInfo } from '../../../infra/database/database';
import { PurchaseProxy } from '../models/purchase.proxy';

//#endregion

export class PurchaseService {

  //#region Public Properties

  public purchaseData: PurchaseProxy[] = getPurchaseInfo();

  //#endregion

  //#region Public Functions

  public async listPurchases(): Promise<PurchaseProxy[]> {
    return this.purchaseData;
  }

  public async listPurchaseByCode(req, res): Promise<PurchaseProxy> {
    const purchase = this.purchaseData.find(i => i.cod === req.params.cod);

    if (!purchase)
      return res.json({ error: 'Compra não encontrada.' });

    return purchase;
  }

  //#endregion

}
