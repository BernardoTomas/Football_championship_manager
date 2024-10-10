import ITeam from '../Interfaces/ITeam';
import ITeamModel from '../Interfaces/ITeamModel';
import SequelizeTeamModel from '../database/models/SequelizeTeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeamModel;

  async findAll():Promise<ITeam[]> {
    const data = await this.model.findAll({ raw: true });
    return data;
  }

  async findById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id, { raw: true });
    if (data == null) return null;
    return data;
  }

  async findTwoById(id1: number, id2: number): Promise<ITeam[] | null> {
    const data = await this.model.findAll({ where: { id: [id1, id2] } });
    return data.length === 2 ? data : null;
  }
}
