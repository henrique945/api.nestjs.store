import { PurchaseService } from '../../purchase/services/purchase.service';
import { SaleService } from '../../sale/services/sale.service';
import { ReportCardProxy } from '../models/report-card.proxy';

export class ReportService {

  //#region Constructor

  constructor(
    private readonly saleService: SaleService,
    private readonly purchaseService: PurchaseService,
  ) {}

  //#endregion

  //#region Public Functions

  public async getCards(): Promise<ReportCardProxy[]> {
    const purchases = await this.purchaseService.listPurchases();
    const sales = await this.saleService.listSales();

    const totalPurchases = purchases.reduce((sum, i) => {
      return sum + i.total;
    }, 0).toFixed(2);

    const totalSales = sales.reduce((sum, i) => {
      return sum + i.total;
    }, 0).toFixed(2);

    const ICMSPurchases = purchases.reduce((sum, i) => {
      return sum + i.ICMS;
    }, 0).toFixed(2);

    const STPurchases = purchases.reduce((sum, i) => {
      return sum + i.ST;
    }, 0).toFixed(2);

    return [
      {
        tag: 'COMPRAS',
        valor: `R$ ${ totalPurchases }`,
      },
      {
        tag: 'VENDAS',
        valor: `R$ ${ totalSales }`,
      },
      {
        tag: 'ICMS',
        valor: `R$ ${ ICMSPurchases }`,
      },
      {
        tag: 'ST',
        valor: `R$ ${ STPurchases }`,
      },
    ];
  }

  //#endregion

}
