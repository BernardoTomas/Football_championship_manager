import Team from '../database/models/SequelizeTeamModel';
import IMatch from '../Interfaces/IMatch';
import IMatchModel from '../Interfaces/IMatchModel';
import SequelizeMatchModel from '../database/models/SequelizeMatchModel';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatchModel;

  async findAll(): Promise<IMatch[]> {
    const data = await this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  async findAllByInProgress(inProgressValue: boolean): Promise<IMatch[]> {
    const data = await this.model.findAll({
      where: { inProgress: inProgressValue },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return data;
  }

  async updateMatchEnd(id: number): Promise<string | null> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });

    if (affectedRows === 0) return null;

    return 'Finished';
  }
}
