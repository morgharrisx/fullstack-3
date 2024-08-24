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

// Use the routes
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

// route for login authentication
app.get("/login", (req, res) => {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
    "user-top-read",
    "user-read-email",
    "user-read-private"
  ]
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

//callback route for spotify response
app.get("/callback", async (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  const state = req.query.state;

  console.log("Authorization Code:", code);
  console.log("Error Query Parameter:", error); //showing undefined

  if (error) {
    console.error("Error during authentication", error);
    res.send(`Error during authentication:, ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const accessToken = data.body["access_token"];
      const refreshToken = data.body["refresh_token"];
      const expiresIn = data.body["expires_in"];

      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setRefreshToken(refreshToken);

      //access token and refresh token showing in the terminal
      console.log(
        `Access Token:${accessToken}`,
        `Refresh Token:${refreshToken}`
      );
      res.redirect(
        `http://localhost:3000/dashboard?access_token=${accessToken}`
      );

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const accessTokenRefreshed = data.body["access_token"];
        spotifyApi.setAccessToken(accessTokenRefreshed);
      }, (expiresIn / 2) * 1000);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.send("Error getting token");
    });
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  console.log(spotifyApi.accessToken);
  spotifyApi
    .searchTracks(q)
    .then((data) => {
      return res.json({ data });
    })
    .catch((error) => {
      console.error("Error:", error);
      res.send("Err searching");
    });
});







app.get("/detailed-stats", async (req, res) => {
  try {
    // Step 1: Get the user's top 20 tracks
    const term = req.query.term || "medium_term"; // Allow the user to specify the term
    const topTracksData = await spotifyApi.getMyTopTracks({
      limit: 20,
      time_range: term,
    });
    const topTracks = topTracksData.body.items;

    // Extract track IDs
    const trackIds = topTracks.map((track) => track.id);

    // Step 2: Get audio features for these tracks
    const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(
      trackIds
    );
    const audioFeatures = audioFeaturesData.body.audio_features;

    // Step 3: Extract and format the required data (tempo and key)
    const detailedStats = audioFeatures.map((feature, index) => ({
      trackName: topTracks[index].name,
      artistName: topTracks[index].artists[0].name,
      tempo: feature.tempo,
      key: feature.key,
      duration_ms: feature.duration_ms,
      mode: feature.mode,
      trackId: topTracks[index].id,
    }));

    // Step 4: Sort by BPM (tempo) in descending order and select the top 3
    const top3BPMTracks = detailedStats
      .sort((a, b) => b.tempo - a.tempo)
      .slice(0, 3);

    // Step 5: Send the top 3 tracks as a JSON response
    return res.json(top3BPMTracks);
  } catch (err) {
    console.error("Something went wrong!", err);
    return res.status(500).json({ error: "Failed to fetch audio features" });
  }
});


