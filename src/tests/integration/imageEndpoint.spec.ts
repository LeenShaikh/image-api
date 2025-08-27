import request from 'supertest';
import app from '../../app.js';
describe('Image API Endpoint', () => {
  it('should return 200 for valid image params', async () => {
    const res = await request(app).get('/api/images').query({
      filename: 'palmtunnel.jpg',
      width: 200,
      height: 300,
      format: 'jpg',
    });

    expect(res.status).toBe(200);
  });

  it('should return 400 for invalid params', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: 'palmtunnel.jpg', width: -10 });

    expect(res.status).toBe(400);
  });

  it('should return 404 if original image does not exist', async () => {
    const res = await request(app)
      .get('/api/images')
      .query({ filename: 'nonexistent.jpg' });

    expect(res.status).toBe(404);
  });
});
