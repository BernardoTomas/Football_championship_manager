import { MatchScoreReqType } from '../Interfaces/MatchScoreReqType';
import { ServiceRes } from '../Interfaces/ServiceResponseTypes';
import IMatchModel from '../Interfaces/IMatchModel';
import IMatch from '../Interfaces/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(): Promise<ServiceRes<IMatch[]>> {
    const allMatchesList = await this.matchModel.findAll();
    return { status: 'SUCCESSFUL', data: allMatchesList };
  }

  public async getAllByInProgress(inProgress: boolean): Promise<ServiceRes<IMatch[]>> {
    const allByInProgress = await this.matchModel.findAllByInProgress(inProgress);
    return { status: 'SUCCESSFUL', data: allByInProgress };
  }

  public async updateMatchEnd(id: number): Promise<ServiceRes<{ message: string }>> {
    const updateMatchRes = await this.matchModel.updateMatchEnd(id);
    if (updateMatchRes === null) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'Match already finished or incorrect id' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: updateMatchRes } };
  }

  public async updateMatchScore(
    newMatchScore: MatchScoreReqType,
    id: number,
  ): Promise<ServiceRes<{ message: string }>> {
    const updateMatchRes = await this.matchModel.updateMatchScore(newMatchScore, id);
    if (updateMatchRes === null) {
      return {
        status: 'BAD_REQUEST',
        data: { message: 'Incorrect match score or id' },
      };
    }
    return { status: 'SUCCESSFUL', data: { message: updateMatchRes } };
  }
}
