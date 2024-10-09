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
}
