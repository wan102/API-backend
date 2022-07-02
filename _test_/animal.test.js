const request =require('supertest')
const app = require('./common/app.test.js')

const expected = {
        "id": 1,
        "name": "jaja",
        "image_url": "/user/kenko/workspace/nodejs/backend_final/public/animals/avatar/1653152706438n02110627_13665.jepg",
        "birthday": "2018-05-07 17:0523.378",
        "gender": "male",
        "isneutered": true,
        "note": null,
        "status": "available",
        "breed_id": 1,
        "centre_id": 3
    }


describe('Animals Testing Cases', ()=> {
  xit('Check the status code is correct', async() => {
    const res = await request(app.callback())
      .get('/api/v1/animals')
      .send({})
  })

  it('Return all animals', async() => {
    const res = await request(app.callback())
      .get('/api/v1/animals')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual("application/json")

    //body json use toContainEqual
    expect(res.body).toContainEqual(expected)
}) 

})