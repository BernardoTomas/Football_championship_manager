export type LeaderboardObjectType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

export default interface ILeaderboardModel {
  getLeaderboard(): Promise<LeaderboardObjectType[]>;
  getHomeLeaderboard(): Promise<LeaderboardObjectType[]>;
  getAwayLeaderboard(): Promise<LeaderboardObjectType[]>;
}
