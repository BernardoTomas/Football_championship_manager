import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response) {
    const serviceRes = await this.matchService.getAllMatches();
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public async getAllByInProgress(req: Request, res: Response) {
    const { inProgress } = req.query;
    const inProgressBool = inProgress !== 'false';
    const serviceRes = await this.matchService.getAllByInProgress(inProgressBool);
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public async updateMatchEnd(req: Request, res: Response) {
    const { id } = req.params;
    const serviceRes = await this.matchService.updateMatchEnd(Number(id));
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }
}
