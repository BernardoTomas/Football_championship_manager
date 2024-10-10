import IMatch from './IMatch';
import { MatchScoreReqType } from './MatchScoreReqType';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findAllByInProgress(inProgress: boolean): Promise<IMatch[]>;
  updateMatchEnd(id: number): Promise<string | null>;
  updateMatchScore(newMatchScore: MatchScoreReqType, id: number): Promise<string | null>;
}
