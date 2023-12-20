const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')
const { things } = require('./data/seeds/01-stuff')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe("sanity check", () => {
  test('[1] sanity check', () => {
    const x = 1
    const y = 2
    expect(x).not.toEqual(y)
  })
})

describe("integration tests", () => {
  describe('SERVER', () => {
    test('[2] server is functional', async () => {
      const res = await request(server).get('/')
      expect(res.status).toEqual(404)
    })
  })
  describe('[GET] /api/stuff', () => {
    let result
    beforeAll(async () => {
      result = await request(server).get('/api/stuff')
    })
    test('[3] responds with status 200 on proper request', () => {
      expect(result.status).toEqual(200)
    })
    test('[4] can get correct number of things', () => {
      expect(result.body).toHaveLength(things.length)
    })
    test('[5] each thing has an id and a name', () => {
      result.body.forEach((thing) => {
        expect(thing).toHaveProperty('id')
        expect(thing).toHaveProperty('thing')
      })
    })
  })
  describe('[POST] /api/stuff', () => {
    // test('[6] can add something to the database', () => {})
    // test('[7] trims leading and trailing white space before posting', () => {})
    // test('[8] responds with a 201 and the new thing', () => {})
    // test('[9] responds with a 400 if thing already exists', () => {})
    
  })
  describe('[DELETE] /api/stuff/:id', () => {
    // test('[10] can delete the correct item', () => {})
  })
})