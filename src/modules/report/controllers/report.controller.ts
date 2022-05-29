//#region Imports

import express from 'express';
import { ReportCardProxy } from '../models/report-card.proxy';
import { ReportService } from '../services/report.service';

//#endregion

export class ReportController {

  //#region Constructors

  constructor(
    private readonly reportService: ReportService,
  ) {}

  //#endregion

  //#region Public Functions

  public getRoutes(): express.Router {
    const router = express.Router();

    router.get('/report/cards', this.getCards.bind(this));
    // router.get('/report/graphics', this.getGraphics.bind(this));
    // router.get('/report/table', this.getTable.bind(this));

    return router;
  }

  /**
   * Método que retornar tags e valores somados de Compras, Vendas, ICMS e ST
   */
  public async getCards(req, res): Promise<ReportCardProxy[]> {
    return await this.reportService.getCards().then(response => res.json(response));
  }

  public getGraphics(req, res): any {

  }

  public getTable(req, res): any {

  }

  //#endregion

}
