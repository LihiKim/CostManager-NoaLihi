/**
 * @module tests/about
 * @description Test suite for team information endpoint
 */

const request = require('supertest');
const { app } = require('./setup');
const mongoose = require('mongoose');
const About = mongoose.model('About');

/**
 * Test suite for about endpoint
 * @group GET /api/about
 */
describe('GET /api/about', () => {
  /**
   * Setup test data before each test
   * @function beforeEach
   */
  beforeEach(async () => {
    /* Clean up existing team data */
    await About.deleteMany({});
    
    /* Insert test team members */
    await About.create([
      {
        id: "207688623",
        first_name: "Lihi",
        last_name: "Kimhazi",
        birthday: new Date("1998-11-03"),
        marital_status: "single"
      },
      {
        id: "325067197",
        first_name: "Noa",
        last_name: "Gerbi",
        birthday: new Date("2002-12-07"),
        marital_status: "married"
      }
    ]);
  });

  /* Test retrieval of team member information */
  it('should return the team details', async () => {
    const res = await request(app).get('/api/about');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    /* Verify first team member details */
    expect(res.body).toContainEqual({ first_name: 'Lihi', last_name: 'Kimhazi' });
    /* Verify second team member details */
    expect(res.body).toContainEqual({ first_name: 'Noa', last_name: 'Gerbi' });
  });
});
