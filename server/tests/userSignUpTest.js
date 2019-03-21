/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);

describe('User tests', () => {
  it('should be able to signup', (done) => {
    const user = {
      firstName: 'Peter',
      lastName: 'Mark',
      email: 'peter@epicmail.rw',
      password: 'password',
      phoneNo: '781234567',
    };
    chai.request(server)
      .post('/api/v2/auth/signup')
      .send(user)
      .end((err, res) => {
        chai.expect(res.status).to.be.equal(201);
        res.body.token.should.be('string');
      });
    done();
  });
});
