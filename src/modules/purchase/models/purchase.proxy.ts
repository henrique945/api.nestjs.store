export class PurchaseProxy {

  //#region Constructors

  constructor(entity: Partial<PurchaseProxy>) {
    Object.assign(entity, this);
  }

  //#endregion

  //#region Public Properties

  /**
   * Código do item
   */
  public cod: string;

  /**
   * Data da compra
   */
  public data: string;

  /**
   * Quantidade de items
   */
  public qtd: number;

  /**
   * Valor total da soma dos items
   */
  public total: number;

  /**
   * Valor do ICMS pago
   */
  public ICMS: number;

  /**
   * Valor do ST pago
   */
  public ST: number;

  //#endregion

}
