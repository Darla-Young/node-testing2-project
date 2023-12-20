const request = require('supertest')
const server = require('./api/server')
const db = require('./data/dbConfig')
const { things } = require('./data/seeds/01-stuff')

describe("sanity check", () => {
  test('[1] sanity check', () => {
    const x = 1
    const y = 2
    expect(x).not.toEqual(y)
  })
})

describe("integration tests", () => {
  beforeEach(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
    await db.seed.run()
  })
  afterAll(async () => {
    await db.destroy()
  })

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
    let result
    let newStuff
    beforeEach(async () => {
      result = await request(server).post('/api/stuff').send({thing: '   android   '})
      newStuff = await db('stuff')
    })
    test('[6] can add something to the database', () => {
      expect(newStuff).toHaveLength(things.length + 1)
    })
    test('[7] trims leading and trailing white space before posting', () => {
      expect(result.body).toMatchObject({thing: 'android'})
    })
    test('[8] responds with a 201', () => {
      expect(result.status).toBe(201)
    })
    test('[9] responds with a 400 if thing already exists', async () => {
      expect(newStuff[things.length]).toMatchObject({thing: 'android'})
      const res = await request(server).post('/api/stuff').send({thing: 'android'})
      expect(res.status).toBe(400)
    })
    
  })
  describe('[DELETE] /api/stuff/:id', () => {
    test('[10] can delete the correct item', async () => {
      const res = await request(server).delete('/api/stuff/1')
      expect(res.body).toHaveLength(things.length - 1)
    })
  })
})