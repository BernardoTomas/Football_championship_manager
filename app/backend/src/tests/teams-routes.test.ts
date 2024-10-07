import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/SequelizeTeamModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/teams endpoint test', () => {
  afterEach(sinon.restore);

  it('Testing getAll()', async function() {
    sinon.stub(Team, 'findAll').resolves([{ id: 1, team_name: 'Bahia' }, { id: 2, team_name: 'Cruzeiro' }] as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([{ id: 1, team_name: 'Bahia' }, { id: 2, team_name: 'Cruzeiro' }]);
  }) 
});
