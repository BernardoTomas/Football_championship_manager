import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getLeaderboard(_req: Request, res: Response) {
    const serviceRes = await this.leaderboardService.getLeaderboard();
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public async getHomeLeaderboard(_req: Request, res: Response) {
    const serviceRes = await this.leaderboardService.getHomeLeaderboard();
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public async getAwayLeaderboard(_req: Request, res: Response) {
    const serviceRes = await this.leaderboardService.getAwayLeaderboard();
    return res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }
}
