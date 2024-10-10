import IMatch from './IMatch';

export default interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findAllByInProgress(inProgress: boolean): Promise<IMatch[]>;
  updateMatchEnd(id: number): Promise<string | null>;
}
