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
    expect(tokenPayload).to.deep.equal({ 
      id: 1, 
      username: 'Admin',
      role: 'admin', 
      email: 'admin@admin.com',
    });
  });

  it('post /login sem o campo email deve retornar um status 400 uma mensagem de erro', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send({ password: 'senha_nao_importa' });

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('post /login sem o campo password deve retornar um status 400 uma mensagem de erro', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send({ email: 'email@email.com' });

    expect(status).to.equal(400);
    expect(body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('post /login com password inválido deve retornar um status 401 uma mensagem de erro', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send({ email: 'email@email.com', password: 'erro' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' })
  });

  it('post /login com email inválido deve retornar um status 401 uma mensagem de erro', async function () {
    const { status, body } = await chai.request(app).post('/login')
      .send({ email: 'email', password: 'senha_secreta' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' })
  });

  it('post /login com email inexistente no banco de dados deve retornar um status 401 e uma mensagem de erro', async function() {
    sinon.stub(User, 'findOne').resolves();

    const { status, body } = await chai.request(app).post('/login')
      .send({ email: 'admin@admin.com', password: 'senha_errada' });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('get /login/role deve retornar a role o usuário quando o token vier correto', async function () {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzI4NDc3MTYzfQ.Dij8dPUl9WlosC2iviGccC5JUNrWZp_Yuo5gHOUKHuE');

    expect(status).to.equal(200);
    expect(body).to.be.deep.equal({ role: 'admin' });
  })

  it('get /login/role deve retornar status 401 e uma mensagem de erro quando o token vier incorreto', async function () {
    const { status, body } = await chai.request(app)
      .get('/login/role')
      .set('authorization', 'Bearer ey');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('get /login/role deve retornar status 401 e uma mensagem de erro quando não vier token', async function () {
    const { status, body } = await chai.request(app)
      .get('/login/role');

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  })
});
