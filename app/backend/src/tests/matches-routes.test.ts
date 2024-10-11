import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/SequelizeMatchModel';
import Team from '../database/models/SequelizeTeamModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('/matches endpoint test', function () {
  afterEach(sinon.restore);

  it('get /matches deve retornar array de matches', async function() {
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

  it('get /matches?inProgress=false deve retornar array de matches com inProgress: false', async function() {
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

  it('get /matches?inProgress=true deve retornar array de matches com inProgress: true', async function() {
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

  it('patch /matches/:id/finish deve retornar status 200 um objeto com a mensagem "Finished" quando tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([1]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE');

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Finished' });
  })

  it('patch /matches/:id/finish deve retornar status 400 um objeto com a mensagem de erro quando não tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([0]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE');

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Match already finished or incorrect id' });
  })

  it('patch /matches/:id/finish deve retornar status 401 e uma mensagem de erro quando o token vier incorreto', async function () {
    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', 'Bearer ey');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('patch /matches/:id/finish deve retornar status 401 e uma mensagem de erro quando não vier token', async function () {
    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  })

  it('patch /matches/:id deve retornar status 200 um objeto com a mensagem "Score updated" quando tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([1]);

    const { status, body } = await chai.request(app)
      .patch('/matches/41')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE')
      .send({
        homeTeamGoals: 2,
        awayTeamGoals: 4
      });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Score updated' });
  })

  it('patch /matches/:id deve retornar status 400 um objeto com a mensagem de erro quando não tiver sucesso', async function () {
    sinon.stub(Match, 'update').resolves([0]);

    const { status, body } = await chai.request(app)
      .patch('/matches/4100')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE')
      .send({
        homeTeamGoals: 2,
        awayTeamGoals: 4
      });

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'Incorrect match score or id' });
  })

  it('patch /matches/:id deve retornar status 401 e uma mensagem de erro quando o token vier incorreto', async function () {
    const { status, body } = await chai.request(app)
      .patch('/matches/41')
      .set('authorization', 'Bearer ey');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('patch /matches/:id deve retornar status 401 e uma mensagem de erro quando não vier token', async function () {
    const { status, body } = await chai.request(app)
      .patch('/matches/41');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  })

  it('post /matches deve retornar o status 201 e o novo match criado quando tiver sucesso', async function () {
    sinon.stub(Team, 'findAll').resolves([{ id: 1 }, { id: 2 }] as any);
    sinon.stub(Match, 'create').resolves({ 
        "id": 1,
        "homeTeamId": 1,
        "homeTeamGoals": 1,
        "awayTeamId": 2,
        "awayTeamGoals": 1,
        "inProgress": true, 
      } as any);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE')
      .send({
        homeTeamId: 1,
        homeTeamGoals: 1,
        awayTeamId: 2,
        awayTeamGoals: 1,
      });

    expect(status).to.equal(201);
    expect(body).to.deep.equal({ 
      "id": 1,
      "homeTeamId": 1,
      "homeTeamGoals": 1,
      "awayTeamId": 2,
      "awayTeamGoals": 1,
      "inProgress": true, 
    })
  })

  it('post /matches deve retornar o status 404 e uma mensagem de erro quando o id de pelo menos um dos times for inexistente', async function () {
    sinon.stub(Team, 'findAll').resolves([{ id: 1 }] as any);

    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE')
      .send({
        homeTeamId: 1,
        homeTeamGoals: 1,
        awayTeamId: 2,
        awayTeamGoals: 1,
      });

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'There is no team with such id!' });
  })

  it('post /matches deve retornar o status 422 e uma mensagem de erro quando os ids dos time forem iguais', async function () {
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE')
      .send({
        homeTeamId: 1,
        homeTeamGoals: 1,
        awayTeamId: 1,
        awayTeamGoals: 1,
      });

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })

  it('post /matches deve retornar status 401 e uma mensagem de erro quando o token vier incorreto', async function () {
    const { status, body } = await chai.request(app)
      .post('/matches')
      .set('authorization', 'Bearer ey');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('post /matches deve retornar status 401 e uma mensagem de erro quando não vier token', async function () {
    const { status, body } = await chai.request(app)
      .post('/matches');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  })
});
