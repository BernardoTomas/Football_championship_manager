import { ServiceRes } from '../Interfaces/ServiceResponseTypes';
import ITeamModel from '../Interfaces/ITeamModel';
import TeamModel from '../models/TeamModel';
import ITeam from '../Interfaces/ITeam';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceRes<ITeam[]>> {
    const allTeamsList = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeamsList };
  }

  public async getTeamById(id: number): Promise<ServiceRes<ITeam>> {
    const teamById = await this.teamModel.findById(id);
    if (!teamById) {
      return { status: 'NOT_FOUND', data: { message: `Time com id ${id} não encontrado` } };
    }
    return { status: 'SUCCESSFUL', data: teamById };
  }
}
