/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.should();
chai.use(chaiHttp);

describe('Group tests', () => {
  it('should be able to create a group', (done) => {
    const newGroup = {
      groupName: 'group 10',
      role: 'TechMint',
    };
    chai.request(server)
      .post('/api/v2/groups')
      .send(newGroup).set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExOTgxNmQwLWJiOTAtNDZkOC1iNDEyLTdiMGU3ZThjY2Y0NiIsImlhdCI6MTU1MzQ1NDM5NiwiZXhwIjoxNTUzNTQwNzk2fQ.xkWbmnPj5DZWFwYThNffEMPaYofW9y6ax9FvrxZjnMs')
      .end((err, res) => {
        chai.expect(res.body).to.be.a('object');
        chai.expect(res.statusCode).to.be.equal(201);
        res.body.data.should.have.property('groupid');
        res.body.data.should.have.property('groupname');
        res.body.data.should.have.property('rolee');
        res.body.data.should.have.property('admin');
      });
    done();
  });
  it('should be able to display all groups', (done) => {
    chai.request(server)
      .get('/api/v2/groups')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExOTgxNmQwLWJiOTAtNDZkOC1iNDEyLTdiMGU3ZThjY2Y0NiIsImlhdCI6MTU1MzQ1NDM5NiwiZXhwIjoxNTUzNTQwNzk2fQ.xkWbmnPj5DZWFwYThNffEMPaYofW9y6ax9FvrxZjnMs')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(200);
        chai.expect(res.body).to.be.a('object');
        done();
      });
  });
  it('should be able to display a specified group', (done) => {
    chai.request(server)
      .get('/api/v2/groups/new group2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExOTgxNmQwLWJiOTAtNDZkOC1iNDEyLTdiMGU3ZThjY2Y0NiIsImlhdCI6MTU1MzQ1NDM5NiwiZXhwIjoxNTUzNTQwNzk2fQ.xkWbmnPj5DZWFwYThNffEMPaYofW9y6ax9FvrxZjnMs')
      .end((err, res) => {
        res.body.message.should.be.a('string');
        done();
      });
  });
  it('should not be able to remove group', (done) => {
    chai.request(server)
      .delete('/api/v2/groups/4')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImExOTgxNmQwLWJiOTAtNDZkOC1iNDEyLTdiMGU3ZThjY2Y0NiIsImlhdCI6MTU1MzQ1NDM5NiwiZXhwIjoxNTUzNTQwNzk2fQ.xkWbmnPj5DZWFwYThNffEMPaYofW9y6ax9FvrxZjnMs')
      .end((err, res) => {
        chai.expect(res.statusCode).to.be.equal(401);
        res.body.message.should.be.a('string');
        done();
      });
  });
});
