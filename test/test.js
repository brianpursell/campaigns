const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = "http://localhost:3000";

chai.use(chaiHttp);

const userTestCases = {
  user1: "Austin.jpg",
  user2: "SanFrancisco.jpg",
  user3: "Sports.jpg",
  user4: "Sports.jpg",
  user5: "smb.jpg",
  user6: "SanFrancisco.jpg",
  user7: "Austin.jpg",
  user8: "Software.jpg",
  user9: "proof.png",
  user10: "Sports.jpg"
};

for (let key in userTestCases) {
  const user = key;
  const img = userTestCases[key];

  it(`${user} should see ${img}`, done => {
    chai
      .request(app)
      .post(`/login?username=${user}&password=1234`)
      .end((err, res) => {
        expect(res.body.img).to.equal(img);
        done();
      });
  });
}
