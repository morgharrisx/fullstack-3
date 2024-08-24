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

// Use the routes
app.use(detailedStatsRoute(spotifyApi));
app.use(topTracksRoute(spotifyApi));
app.use(topArtistsRoute(spotifyApi));
app.use(djRoute(spotifyApi));
app.use(recommendationsRoute(spotifyApi));


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



//top-genres
app.get("/top-genres", async (req, res) => {
  const { term } = req.query;
  const validTerms = ["short_term", "medium_term", "long_term"];
  const timeRange = validTerms.includes(term) ? term : "medium_term";

  try {
    const topArtistsResponse = await spotifyApi.getMyTopArtists({ time_range: timeRange });
    const topArtists = topArtistsResponse.body.items;

    //Genres from the top artists
    const genreCount = {};
    topArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    // Sort by count
    const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
    const topGenres = sortedGenres.slice(0, 5).map(([genre, count]) => ({
      genre,
      count
    }));

    // response
    return res.json({
      message: "Success",
      total_genres: topGenres.length,
      data: topGenres,
    });
  } catch (error) {
    console.error("Error getting top genres:", JSON.stringify(error, null, 4));
    return res.status(500).json({
      message: "Error getting top genres",
      error: error.response ? error.response.data : error.message,
    });
  }
});


//user profile endpoint
app.get("/me", async (req, res) => {
     spotifyApi.getMe().then((data)=> {
      console.log('Some information about the authenticated user', data.body);
    
      return res.json(data.body)
     }) .catch((err) => {
      console.error('Error getting user profile:', err);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    });
    })



////DANCEABILITY

app.get("/danceability", async (req, res) => {
  try {
    const topTracksResponse = await spotifyApi.getMyTopTracks();
    const topTracks = topTracksResponse.body.items;
    const top20TracksID = topTracks.slice(0, 20).map(track => (track.id));
    const audioFeatResponse = await spotifyApi.getAudioFeaturesForTracks(top20TracksID);
    const allAudioFeats = audioFeatResponse.body.audio_features;
    const sortedFeats = allAudioFeats.sort((a,b)=> b.danceability -a.danceability);
    const mostDanceableSong= sortedFeats[0];
    const foundSong = topTracks.find(song => song.id === mostDanceableSong.id);

    return res.json({
      message: "Success",
      name: foundSong.name,
      album: foundSong.album.name,
      artist: foundSong.artists.map(artist => artist.name).join(', '),
      embedUri: `https://open.spotify.com/embed/track/${foundSong.id}`
    });
  } catch (error) {
    console.error("Error getting top tracks:", JSON.stringify(error, null, 4));
    return res.status(500).json({
      message: "Error getting danceable song",
      error: error.response ? error.response.data : error.message,
    });
  }
})

    


// Endpoint to create a playlist named 'VibeFusion'
app.post('/create-playlist', async (req, res) => {
  try {
    const playlistName = 'VibeFusion';
    const options = { public: false, description: "Generated by VibeFusion" };
    const playlistResponse = await spotifyApi.createPlaylist (playlistName, options);
    const playlistId = playlistResponse.body.id; 
    const { trackUris } = req.body;
    if (trackUris.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of track URIs.' });
    }

    const addTracksResponse = await spotifyApi.addTracksToPlaylist(playlistId, trackUris);

    res.status(200).json({message: 'yaay playlist created'}); 
  } catch (error) {
    res.status(500).json({ error: `Failed to create playlist ${error.message}`});
  }
});




//CALCULATE MOOD
app.get('/mood', async (req, res) => {
  try {
      const data = await spotifyApi.getMyTopTracks({ limit: 20 });
      const topTracks = data.body.items;
      const trackIds = topTracks.map(track => track.id);
      const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(trackIds);
      const audioFeatures = audioFeaturesData.body.audio_features;
      console.log('Audio Features:', audioFeatures);
      let totalValence = 0;
      let trackCount = 0;
      for (let index = 0; index < audioFeatures.length; index++) {
        const feature = audioFeatures[index];
        if (feature && feature.valence !== undefined) {
            totalValence += feature.valence;
            trackCount++;
        }
      }
      const averageValence = trackCount > 0 ? totalValence / trackCount : 0;
      console.log('Average Valence:', averageValence);
      res.json({ average_valence: averageValence });
  } catch (error) {
      console.error('Error fetching top tracks or audio features:', error);
      res.status(500).send('Error fetching top tracks or audio features');
  }
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


