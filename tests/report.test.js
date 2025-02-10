/**
 * @module tests/report
 * @description Test suite for expense report generation endpoints
 */

const request = require('supertest');
const { app } = require('./setup');

/**
 * Test suite for report generation functionality
 * @group Report API
 */
describe('Report API', () => {
  const testUserId = '77777';

  beforeAll(async () => {
    await request(app).post('/api/users').send({
      id: testUserId,
      first_name: 'Report',
      last_name: 'User',
      birthday: '1995-05-05',
      marital_status: 'single'
    });

    await request(app).post('/api/costs/add').send({
      description: 'Rent',
      category: 'housing',
      userid: testUserId,
      sum: 1000,
      date: '2024-01-10'
    });

    await request(app).post('/api/costs/add').send({
      description: 'Gym',
      category: 'sport',
      userid: testUserId,
      sum: 150,
      date: '2024-01-15'
    });

    await request(app).post('/api/costs/add').send({
      description: 'Miscellaneous',
      category: 'other',
      userid: testUserId,
      sum: 200,
      date: '2024-01-20'
    });
  });

  it('should return a monthly report with all categories and correct totals', async () => {
    const response = await request(app)
      .get('/api/report')
      .query({ id: testUserId, year: '2024', month: '1' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userid).toBe(testUserId);
    expect(response.body.month).toBe(1);
    expect(response.body.year).toBe(2024);

    const categories = ['food', 'health', 'housing', 'sport', 'education', 'other'];
    categories.forEach(category => {
      expect(response.body.costs).toHaveProperty(category);
    });

    expect(response.body.costs.housing).toEqual([
      { sum: 1000, description: 'Rent', day: 10 }
    ]);

    expect(response.body.costs.sport).toEqual([
      { sum: 150, description: 'Gym', day: 15 }
    ]);

    expect(response.body.costs.other).toEqual([
      { sum: 200, description: 'Miscellaneous', day: 20 }
    ]);
  });

  it('should return all categories with empty arrays when no expenses exist', async () => {
    const response = await request(app)
      .get('/api/report')
      .query({ id: testUserId, year: '2022', month: '12' });

    expect(response.statusCode).toBe(200);

    const categories = ['food', 'health', 'housing', 'sport', 'education', 'other'];
    categories.forEach(category => {
      expect(response.body.costs[category]).toEqual([]);
    });
  });

  it('should fail if missing parameters', async () => {
    let response = await request(app)
      .get('/api/report')
      .query({ id: testUserId, month: '1' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/Missing year/);

    response = await request(app)
      .get('/api/report')
      .query({ id: testUserId, year: '2024' });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toMatch(/Missing month/);
  });
});
