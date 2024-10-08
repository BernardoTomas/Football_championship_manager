import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/SequelizeUserModel';

import { Response } from 'superagent';
import ValidationMiddleware from '../middlewares/verifyLoginMiddleware';
import { decode } from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

describe('/login endpoint test', () => {
  afterEach(sinon.restore);

  it('post /login deve retornar um token', async function() {
    sinon.stub(User, 'findOne').resolves({ 
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' 
    } as any);

    const { status, body } = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'secret_admin' });

    const { iat, ...tokenPayload } = decode(body.token) as any;
    expect(status).to.equal(200);
    expect(tokenPayload).to.deep.equal({ id: 1, email: 'admin@admin.com' });;
  });
});
