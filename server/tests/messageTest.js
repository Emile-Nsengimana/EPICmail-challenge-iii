/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.should();
chai.use(chaiHttp);

describe('Message tests', () => {
  it('should be able to send a message', (done) => {
    const message = {
      subject: 'Final year report',
      message: 'The final report will be available next week',
      parentMessageId: 2,
      status: 'unread',
      email: 'emidsle@epicmail.rw',
    };
    chai.request(server)
      .post('/api/v2/messages')
      .send(message).set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExOTgxNmQwLWJiOTAtNDZkOC1iNDEyLTdiMGU3ZThjY2Y0NiIsImlhdCI6MTU1MzE3ODg2NywiZXhwIjoxNTUzMjY1MjY3fQ.12Dcm0WS-RqB0UZiSZcPlCdZEEoE3MXciGWbW_ze858')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.statusCode).to.be.equal(201);
        res.body.data.should.have.property('messageId');
        res.body.data.should.have.property('createdOn');
        res.body.data.should.have.property('subject');
        res.body.data.should.have.property('message');
        res.body.data.should.have.property('parentMessageId');
        res.body.data.should.have.property('userid');
      });
    done();
  });
});
