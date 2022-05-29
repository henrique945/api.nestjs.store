//#region Imports

import { getSaleInfo } from '../../../infra/database/database';
import { SaleProxy } from '../models/sale.proxy';

//#endregion

export class SaleService {

  //#region Public Properties

  public saleData: SaleProxy[] = getSaleInfo();

  //#endregion

  //#region Public Functions

  public async listSales(): Promise<SaleProxy[]> {
    return this.saleData;
  }

  public async listSaleByCode(req, res): Promise<SaleProxy> {
    const sale = this.saleData.find(i => i.cod === req.params.cod);

    if (!sale)
      return res.json({ error: 'Venda não encontrada.' });

    return sale;
  }

  //#endregion

}
