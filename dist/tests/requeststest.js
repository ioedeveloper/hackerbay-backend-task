"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const app = __importStar(require("../app"));
const request = __importStar(require("supertest"));
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
            };
            let authenticatedUser = request.agent(app);
            before((done) => {
                authenticatedUser
                    .post('/login')
                    .send(user)
                    .end((err, response) => {
                    chai_1.expect(response.status).to.equal(200);
                    done();
                });
                done();
            });
            done();
        });
    });
    describe('/POST createthumbnail', () => {
        it('it should POST a public url image', (done) => {
            let image = {
                publicimageurl: "https://i.imgur.com/nQo9kLG.jpg"
            };
            let authenticatedUser = request.agent(app);
            before((done) => {
                authenticatedUser
                    .post('/createthumbnail')
                    .send(image)
                    .end((err, response) => {
                    chai_1.expect(response.status).to.equal(200);
                    done();
                });
                done();
            });
            done();
        });
    });
});
