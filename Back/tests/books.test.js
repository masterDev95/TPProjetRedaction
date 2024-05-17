const supertest = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/books');
const app = express();
app.use(bodyParser.json());
app.use('/', router);
const { getAllBooks } = require('../queries');

describe('GET /books', () => {
  it('should respond with 200 status code when receiving GET request to root endpoint', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });
  it('should respond with 404 status code when receiving GET request to unknown endpoint', async () => {
    const response = await supertest(app).get('/unknown');
    expect(response.status).toBe(404);
  });
  it('should respond with all books in database', async () => {
    const response = await supertest(app).get('/');
    const books = await getAllBooks();
    expect(response.body).toEqual(books);
  });
  it('all books should have id, nom, auteur, genre, description and quantity properties', async () => {
    const response = await supertest(app).get('/');
    response.body.forEach(book => {
      expect(book).toHaveProperty('id');
      expect(book).toHaveProperty('nom');
      expect(book).toHaveProperty('auteur');
      expect(book).toHaveProperty('genre');
      expect(book).toHaveProperty('description');
      expect(book).toHaveProperty('quantity');
    });
  });
  it('each book should have a unique id', async () => {
    const response = await supertest(app).get('/');
    const ids = response.body.map(book => book.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  }); 
});
