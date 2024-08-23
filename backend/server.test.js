import request from 'supertest';
import app from './server'; 
import dotenv from 'dotenv';

dotenv.config({ path: './api/.env' });

describe('Spotify API Routes', () => {

  it('should redirect to Spotify login with correct scopes', async () => {
    const response = await request(app).get('/login');
    expect(response.header.location).toMatch(/https:\/\/accounts.spotify.com\/authorize\?/);
  });

  it('should handle callback with valid authorization code', async () => {
    const mockCode = 'valid_code';
    jest.spyOn(spotifyApi, 'authorizationCodeGrant').mockResolvedValue({
      body: {
        access_token: 'mock_access_token',
        refresh_token: 'mock_refresh_token',
        expires_in: 3600
      }
    });

    const response = await request(app).get(`/callback?code=${mockCode}`);
    expect(response.status).toBe(200);
  });
});

import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

beforeEach(() => {
  jest.clearAllMocks();
});

