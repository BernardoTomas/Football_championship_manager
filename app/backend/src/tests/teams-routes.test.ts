import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/SequelizeTeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams endpoint test', function () {
  afterEach(sinon.restore);

  it('get /teams deve retornar array de times', async function() {
    sinon.stub(Team, 'findAll').resolves([{ id: 1, team_name: 'Bahia' }, { id: 2, team_name: 'Cruzeiro' }] as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([{ id: 1, team_name: 'Bahia' }, { id: 2, team_name: 'Cruzeiro' }]);
  });
  
  it('get /teams/:id deve retornar um time e ter status 200 quando time com id existir', async function() {
    sinon.stub(Team, 'findByPk').resolves({ id: 1, team_name: 'Bahia' } as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ id: 1, team_name: 'Bahia' });
  })

  it('get /teams/:id deve retornar uma mensagem de erro e ter status 404 quando time com id não existir', async function() {
    sinon.stub(Team, 'findByPk').resolves();

    const { status, body } = await chai.request(app).get('/teams/1000');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'Time com id 1000 não encontrado' });
  })
});
