import LeaderboardModel from '../models/LeaderboardModel';
import ILeaderboardModel, { LeaderboardObjectType } from '../Interfaces/ILeaderboardModel';
import { ServiceRes } from '../Interfaces/ServiceResponseTypes';

export default class LeaderboardService {
  constructor(
    private leaderBoardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async getLeaderboard(): Promise<ServiceRes<LeaderboardObjectType[]>> {
    const fullLeaderboard = await this.leaderBoardModel.getLeaderboard();
    return { status: 'SUCCESSFUL', data: fullLeaderboard };
  }

  public async getHomeLeaderboard(): Promise<ServiceRes<LeaderboardObjectType[]>> {
    const homeLeaderboard = await this.leaderBoardModel.getHomeLeaderboard();
    return { status: 'SUCCESSFUL', data: homeLeaderboard };
  }

  public async getAwayLeaderboard(): Promise<ServiceRes<LeaderboardObjectType[]>> {
    const awayLeaderboard = await this.leaderBoardModel.getAwayLeaderboard();
    return { status: 'SUCCESSFUL', data: awayLeaderboard };
  }
}
