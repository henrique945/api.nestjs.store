export class ReportCardProxy {

  //#region Constructors

  constructor(entity: Partial<ReportCardProxy>) {
    Object.assign(entity, this);
  }

  //#endregion

  //#region Public Properties

  /**
   * Nome da tag
   */
  public tag: string;

  /**
   * Valor total da tag
   */
  public valor: string;

  //#endregion

}
