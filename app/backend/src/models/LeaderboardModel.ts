import { Sequelize, QueryTypes } from 'sequelize';
import ILeaderboardModel, { LeaderboardObjectType } from '../Interfaces/ILeaderboardModel';
import {
  getCompleteLbFinished,
  getHomeTeamLbFinished,
  getAwayTeamLbFinished,
} from './SQL/getLeaderboardQueries';

export default class LeaderboardModel implements ILeaderboardModel {
  constructor(
    private sequelize = new Sequelize(
      'TRYBE_FUTEBOL_CLUBE',
      process.env.DB_USER || 'root',
      process.env.DB_PASS || '123456',
      {
        host: process.env.DB_HOST,
        dialect: 'mysql',
      },
    ),
  ) {}

  async getLeaderboard(): Promise<LeaderboardObjectType[]> {
    const leaderboard: LeaderboardObjectType[] = await this.sequelize.query(
      getCompleteLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return leaderboard;
  }

  async getHomeLeaderboard(): Promise<LeaderboardObjectType[]> {
    const homeLeaderboard: LeaderboardObjectType[] = await this.sequelize.query(
      getHomeTeamLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return homeLeaderboard;
  }

  async getAwayLeaderboard(): Promise<LeaderboardObjectType[]> {
    const awayLeaderboard: LeaderboardObjectType[] = await this.sequelize.query(
      getAwayTeamLbFinished,
      {
        type: QueryTypes.SELECT,
        raw: true,
      },
    );
    return awayLeaderboard;
  }
}
