export class ReportTableProxy {

  //#region Constructor

  constructor(entity: Partial<ReportTableProxy>) {
    Object.assign(entity, this);
  }

  //#endregion

  //#region Public Properties

  /**
   * Ano analisado
   */
  public ano: string;

  /**
   * É a soma do valor de todas as vendas do ano em questão
   */
  public compras: string;

  /**
   * É a soma do valor de todas as compras do ano em questão
   */
  public vendas: string;

  /**
   * É a soma do ICMS pago nas compras no ano em questão.
   */
  public ICMS: string;

  /**
   * É a soma do valor de ST pago no ano em questão
   */
  public ST: string;

  //#endregion

}
