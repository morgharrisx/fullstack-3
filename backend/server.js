import dotenv from "dotenv";
import cors from "cors";
import express from "express";
dotenv.config({ path: "./api/.env" });

import SpotifyWebApi from "spotify-web-api-node";

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
});

app.use(express.json());

// Import routes
import loginRoute from './routes/login.js';
import callbackRoute from './routes/callback.js';
import detailedStatsRoute from './routes/detailedStats.js';
import topTracksRoute from './routes/topTracks.js';
import topArtistsRoute from './routes/topArtists.js';
import djRoute from './routes/dj.js';
import recommendationsRoute from './routes/recommendations.js';
import topGenresRoute from './routes/topGenres.js';
import profileRoute from './routes/profile.js';
import danceabilityRoute from './routes/danceability.js';
import createPlaylistRoute from './routes/createPlaylist.js';
import moodRoute from './routes/mood.js';
import searchRoute from './routes/search.js';

// Use the routes
app.use(loginRoute(spotifyApi));
app.use(callbackRoute(spotifyApi));
app.use(searchRoute(spotifyApi));
app.use(detailedStatsRoute(spotifyApi));
app.use(topTracksRoute(spotifyApi));
app.use(topArtistsRoute(spotifyApi));
app.use(djRoute(spotifyApi));
app.use(recommendationsRoute(spotifyApi));
app.use(topGenresRoute(spotifyApi));
app.use(profileRoute(spotifyApi));
app.use(danceabilityRoute(spotifyApi));
app.use(createPlaylistRoute(spotifyApi));
app.use(moodRoute(spotifyApi));

