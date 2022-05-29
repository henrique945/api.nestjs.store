export class ReportGraphicProxy {

  //#region Constructor

  constructor(entity: Partial<ReportGraphicProxy>) {
    Object.assign(entity, this);
  }

  //#endregion

  //#region Public Properties

  /**
   * Ano análisado
   */
  public ano: string;

  /**
   * É a soma das compras, menos a soma das vendas do ano em questão
   */
  public saldo: string;

  /**
   * É o percentual que o saldo represente entre a soma de todos os soldas
   */
  porcentagem: number;

  //#endregion

}
