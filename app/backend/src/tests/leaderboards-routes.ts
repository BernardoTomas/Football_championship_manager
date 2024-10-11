import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import LeaderboardModel from '../models/LeaderboardModel';

chai.use(chaiHttp);

const { expect } = chai;


describe('/leaderboard endpoint test', function () {
  afterEach(sinon.restore);
  
  it('get /leaderboard deve retornar um array de LeaderboardOjects', async function () {
    const lbModel = new LeaderboardModel;
    sinon.stub(lbModel, 'getLeaderboard').resolves([
      {
        "name": "Palmeiras",
        "totalPoints": "6",
        "totalGames": 2,
        "totalVictories": "2",
        "totalDraws": "0",
        "totalLosses": "0",
        "goalsFavor": "7",
        "goalsOwn": "0",
        "goalsBalance": "7",
        "efficiency": "100.00"
      }
    ] as any);

    const { status, body } = await chai.request(app).get('/leaderboard');

    expect(status).to.equal(200);
    expect(body).to.deep.equal([{
      "name": "Palmeiras",
        "totalPoints": "6",
        "totalGames": 2,
        "totalVictories": "2",
        "totalDraws": "0",
        "totalLosses": "0",
        "goalsFavor": "7",
        "goalsOwn": "0",
        "goalsBalance": "7",
        "efficiency": "100.00"
    }])
  })
})