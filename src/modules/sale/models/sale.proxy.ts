export class SaleProxy {

  //#region Constructor

  constructor(entity: Partial<SaleProxy>) {
    Object.assign(entity, this);
  }

  //#endregion

  //#region Public Properties

  /**
   * Código do item
   */
  public cod: string;

  /**
   * Data da venda
   */
  public data: string;

  /**
   * Quantidade de itens
   */
  public qtd: number;

  /**
   * Valor total da soma dos itens
   */
  public total: number;

  //#endregion

}
