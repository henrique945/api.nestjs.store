import { PurchaseProxy } from '../../purchase/models/purchase.proxy';
import { PurchaseService } from '../../purchase/services/purchase.service';
import { SaleProxy } from '../../sale/models/sale.proxy';
import { SaleService } from '../../sale/services/sale.service';
import { ReportCardProxy } from '../models/report-card.proxy';
import { ReportGraphicProxy } from '../models/report-graphic.proxy';
import { ReportTableProxy } from '../models/report-table.proxy';

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

    const totalPurchases = this.getTotalSum(purchases, 'total');
    const totalSales = this.getTotalSum(sales, 'total');
    const ICMSPurchases = this.getTotalSum(purchases, 'ICMS');
    const STPurchases = this.getTotalSum(purchases, 'ST');

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
      const salesOnYear = sales.filter(purchase => purchase.data.includes(year.toString()));

      const totalPurchasesOnYear = this.getTotalSum(purchasesOnYear, 'total');
      const totalSalesOnYear = this.getTotalSum(salesOnYear, 'total');

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

  public async getTable(): Promise<ReportTableProxy[]> {
    const purchases = await this.purchaseService.listPurchases();
    const sales = await this.saleService.listSales();

    const table: ReportTableProxy[] = [];

    for (let year = 2017; year <= 2021; year++) {
      const purchasesOnYear = purchases.filter(purchase => purchase.data.includes(year.toString()));
      const salesOnYear = sales.filter(purchase => purchase.data.includes(year.toString()));

      const totalPurchasesOnYear = this.getTotalSum(purchasesOnYear, 'total');
      const ICMSPurchasesOnYear = this.getTotalSum(purchasesOnYear, 'ICMS');
      const STPurchasesOnYear = this.getTotalSum(purchasesOnYear, 'ST');
      const totalSalesOnYear = this.getTotalSum(salesOnYear, 'total');

      table.push({
        ano: year.toString(),
        compras: this.valueCurrencyFormatter(totalPurchasesOnYear),
        vendas: this.valueCurrencyFormatter(totalSalesOnYear),
        ICMS: this.valueCurrencyFormatter(ICMSPurchasesOnYear),
        ST: this.valueCurrencyFormatter(STPurchasesOnYear),
      });
    }

    return table;
  }

  //#endregion

  //#region Private Functions

  /**
   * Método que fomarta um valor para o front
   */
  private valueCurrencyFormatter(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  /**
   * Método que retorna a soma total de compras ou vendas por propriedade
   */
  private getTotalSum(list: (PurchaseProxy | SaleProxy)[], property: string): number {
    return +(list.reduce((sum, i) => {
      return sum + i[property];
    }, 0).toFixed(2));
  }

  //#endregion

}
