const request =require('supertest')
const app = require('./common/app.test.js')

const expected = {
        "id": 1,
        "email": "test1@gmail.com",
        "user_name": test1,
        "password": "Aa111111"
    }


describe('Animals Testing Cases', ()=> {
  xit('Check the status code is correct', async() => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .send({})
  })

  it('Return all animals', async() => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")

    //body json use toContainEqual
    expect(res.body).toContainEqual(expected)
}) 

})