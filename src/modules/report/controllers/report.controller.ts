//#region Imports

import express from 'express';
import { ReportCardProxy } from '../models/report-card.proxy';
import { ReportGraphicProxy } from '../models/report-graphic.proxy';
import { ReportTableProxy } from '../models/report-table.proxy';
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
    router.get('/report/graphics', this.getGraphics.bind(this));
    router.get('/report/table', this.getTable.bind(this));

    return router;
  }

  /**
   * Método que retornar tags e valores somados de Compras, Vendas, ICMS e ST
   */
  public async getCards(req, res): Promise<ReportCardProxy[]> {
    return await this.reportService.getCards().then(response => res.json(response));
  }

  /**
   * Método que busca informações dos últimos 5 anos de compras e vendas em forma de gráfico
   */
  public async getGraphics(req, res): Promise<ReportGraphicProxy[]> {
    return await this.reportService.getGraphics().then(response => res.json(response));
  }

  /**
   * Método que lista as informações de compras e vendas em forma de tabela
   */
  public async getTable(req, res): Promise<ReportTableProxy[]> {
    return await this.reportService.getTable().then(response => res.json(response));
  }

  //#endregion

}
