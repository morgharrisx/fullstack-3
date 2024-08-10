import dotenv from 'dotenv';
import cors from 'cors';
import express from "express";
import axios from 'axios';
import SpotifyWebApi from ("spotify-web-api-node");
dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`),
);

const spotifyApi = new SpotifyWebApi ({
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI:process.env.REDIRECT_URI
})


// route for login authentication
app.get('/login', (req, res) => {
  const scopes =[ 'user-read-private', 'user-read-email'];
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

//callback route for spotify response
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
    });

    const { access_token, refresh_token } = response.data;

    // Redirect to frontend with tokens
    res.redirect(`http://localhost:5001?access_token=${access_token}&refresh_token=${refresh_token}`);
  } catch (error) {
    res.send('Error during authentication');
  }
});

