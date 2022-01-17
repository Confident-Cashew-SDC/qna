const app = require('../').app
const request = require('supertest');

jest.setTimeout(13000)
//get qa/questions
describe('GET /qa/questions', function() {
  it ('responds with product id and results key', () => {
    request(app)
      .get('/qa/questions')
      .query({product_id: 63610})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((results)=>{
        expect(results["product_id"]).toBe(63610)
        expect(results["results"]).not.toBeNull();
        expect(200, done)
      })
  });
  it ('returns correct number of results based on page and count', () => {
    request(app)
      .get('/qa/questions')
      .set('Accept', 'application/json')
      .query({
        product_id: 63610,
        page: 1,
        count: 1,
      })
      .expect('Content-Type', /json/)
      .expect((result)=>{
        expect(result["product_id"]).toBe(63610)
        expect(result["results"].length).toBe(1);
        expect(200, done)
      })
  });
})

describe('GET /qa/questions/:question_id/answers', function() {
  it ('responds with question, page, count, and results key', () => {
    request(app)
      .get('/qa/questions/:question_id/answers')
      .query({question_id: 1})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((results)=>{
        expect(results["question_id"]).toBe(1)
        expect(results["results"]).not.toBeNull();
        expect(200, done)
      })
  });
  it ('returns correct number of results based on page and count', () => {
    request(app)
      .get('/qa/questions/1/answers')
      .set('Accept', 'application/json')
      .query({
        product_id: 1,
        page: 1,
        count: 1,
      })
      .expect('Content-Type', /json/)
      .expect((result)=>{
        console.log(result)
        expect(result["product_id"]).toBe(1)
        expect(result["results"].length).toBe(1);
        expect(200, done)
      })
  });
})

describe('POST /qa/questions', function () {
  it('responds with 201 status code', () => {
    request(app)
      .post('/qa/questions')
      .set('Accept', 'application/json')
      .send({
        body: 'test',
        name: 'test',
        email: 'test@gmail.com',
        product_id: '1'
      })
      .then((response)=>{
        expect(201);
      })
  });
});

// POST /qa/questions/:question_id/answers
describe('POST /qa/questions/1/answers', function () {
  it('responds with 201 status code', function (done) {
    request(app)
      .post('/qa/questions/1/answers')
      .send({
        body: 'test',
        name: 'test',
        email: 'test@gmail.com',
        product_id: '1'
      })
      .expect(201, done);
  });
});
