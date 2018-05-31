process.env.NODE_ENV = "test";
import * as chai from "chai";
import * as app from "../app";
const should = chai.should();

chai.use(require("chai-http"));

describe('Api Requests Tests', () => {

//   describe('/GET book', () => {
//       it('it should GET all the books', (done) => {
//         chai.request(app)
//             .get('/book')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//               done();
//             });
//       });
//   });
  /*
  * Test the /POST route
  */
  describe('/POST login', () => {
      it('it should POST a username and password', (done) => {
        let user = {
            username: "ioedeveloper",
            password: "hackerbay"
        }
        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('username');
                res.body.should.have.property('password');
              done();
            });
      });

  });
});