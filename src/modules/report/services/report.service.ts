import { PurchaseService } from '../../purchase/services/purchase.service';
import { SaleService } from '../../sale/services/sale.service';
import { ReportCardProxy } from '../models/report-card.proxy';
import { ReportGraphicProxy } from '../models/report-graphic.proxy';

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
        valor: this.valueCurrencyFormatter(+totalPurchases),
      },
      {
        tag: 'VENDAS',
        valor: this.valueCurrencyFormatter(+totalSales),
      },
      {
        tag: 'ICMS',
        valor: this.valueCurrencyFormatter(+ICMSPurchases),
      },
      {
        tag: 'ST',
        valor: this.valueCurrencyFormatter(+STPurchases),
      },
    ];
  }

  public async getGraphics(): Promise<ReportGraphicProxy[]> {
    const purchases = await this.purchaseService.listPurchases();
    const sales = await this.saleService.listSales();

    const graphics: ReportGraphicProxy[] = [];

    // calcular total por ano
    for (let year = 2017; year <= 2021; year++) {
      const purchasesOnYear = purchases.filter(purchase => purchase.data.includes(year.toString()));
      const totalPurchasesOnYear = +(purchasesOnYear.reduce((sum, i) => {
        return sum + i.total;
      }, 0).toFixed(2));

      const salesOnYear = sales.filter(purchase => purchase.data.includes(year.toString()));
      const totalSalesOnYear = +(salesOnYear.reduce((sum, i) => {
        return sum + i.total;
      }, 0).toFixed(2));

      graphics.push({
        ano: year.toString(),
        saldo: (totalPurchasesOnYear - totalSalesOnYear).toString(),
        porcentagem: 0,
      });
    }

    // calcular porcentagens por ano
    const total = graphics.reduce((sum, i) => {
      return sum + +(i.saldo);
    }, 0);

    graphics.forEach(graphic => {
      graphic.porcentagem = +(+graphic.saldo / total).toFixed(2);
      graphic.saldo = this.valueCurrencyFormatter(+graphic.saldo);
    });

    return graphics;
  }

  //#endregion

  //#region Private Functions

  /**
   * Método que fomarta um valor para o front
   */
  private valueCurrencyFormatter(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  //#endregion

}
