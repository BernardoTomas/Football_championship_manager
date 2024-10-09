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
}