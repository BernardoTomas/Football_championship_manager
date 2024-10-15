import { QueryTypes } from 'sequelize';
import ILeaderboardModel, { LeaderboardObjectType } from '../Interfaces/ILeaderboardModel';
import {
  getCompleteLbFinished,
  getHomeTeamLbFinished,
  getAwayTeamLbFinished,
} from './SQL/getLeaderboardQueries';
import sequelize from '../database/models';

export default class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private _sequelize = sequelize,
  ) {}

  async getLeaderboard(): Promise<LeaderboardObjectType[]> {
    const leaderboard: LeaderboardObjectType[] = await this._sequelize.query(
      getCompleteLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return leaderboard;
  }

  async getHomeLeaderboard(): Promise<LeaderboardObjectType[]> {
    const homeLeaderboard: LeaderboardObjectType[] = await this._sequelize.query(
      getHomeTeamLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return homeLeaderboard;
  }

  async getAwayLeaderboard(): Promise<LeaderboardObjectType[]> {
    const awayLeaderboard: LeaderboardObjectType[] = await this._sequelize.query(
      getAwayTeamLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return awayLeaderboard;
  }
}
