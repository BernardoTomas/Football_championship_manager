import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response) {
    const serviceRes = await this.teamService.getAllTeams();
    res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const { id } = req.params;
    const serviceRes = await this.teamService.getTeamById(Number(id));
    res.status(mapStatusHTTP(serviceRes.status)).json(serviceRes.data);
  }
}
