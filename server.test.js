const request = require('supertest')
const server = require('./api/server')

describe("server", () => {
  it('[1] returns status 404 on incorrect page request', async () => {
    const res = await request(server).get('/')
    expect(res.status).toEqual(404)
  })
  // it('[2] can get correct number of things', () => {})
  // it('[3] ', () => {})
  // it('[4] ', () => {})
  // it('[5] ', () => {})
  // it('[6] ', () => {})
  // it('[7] ', () => {})
  // it('[8] ', () => {})
  // it('[9] ', () => {})
  // it('[10] ', () => {})
})