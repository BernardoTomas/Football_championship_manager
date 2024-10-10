import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/SequelizeMatchModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches endpoint test', () => {
  afterEach(sinon.restore);

  it('getAll() deve retornar array de matches', async function() {
    sinon.stub(Match, 'findAll').resolves(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }] as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }]
    );
  });

  it('getAllByInProgress() deve retornar array de matches com inProgress: false quando o query for a string "false"', async function() {
    sinon.stub(Match, 'findAll').resolves(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }] as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }]
    );
  });

  it('getAllByInProgress() deve retornar array de matches com inProgress: true quando o query não for a string "false"', async function() {
    sinon.stub(Match, 'findAll').resolves(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }] as any);

    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(
      [{
        "id": 1,
        "homeTeamId": 16,
        "homeTeamGoals": 1,
        "awayTeamId": 8,
        "awayTeamGoals": 1,
        "inProgress": true,
        "homeTeam": {
          "teamName": "São Paulo"
        },
        "awayTeam": {
          "teamName": "Grêmio"
        }
      }]
    );
  });

  it('updateMatchEnd() deve retornar status 200 um objeto com a mensagem "Finished" quando tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([1]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  })

  it('updateMatchEnd() deve retornar status 400 um objeto com a mensagem de erro quando não tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([0]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Match already finished or incorrect id' });
  })
});
