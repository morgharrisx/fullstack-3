import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios"; // not using currently
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

//top-tracks
app.get("/top-tracks", async (req, res) => {
  const { term } = req.query;
  const validTerms = ["short_term", "medium_term", "long_term"];
  const timeRange = validTerms.includes(term) ? term : "medium_term";

  try {
    const topTracksResponse = await spotifyApi.getMyTopTracks({
      time_range: timeRange,
    });
    const topTracks = topTracksResponse.body.items;
    const top10Tracks = topTracks.slice(0, 10).map((track) => ({
      name: track.name,
      album: track.album.name,
      artists: track.artists.map((artist) => artist.name),
      popularity: track.popularity,
      externalUrl: track.external_urls.spotify,
      images: track.album.images,
    }));

    // Response
    return res.json({
      message: "Success",
      total_tracks: top10Tracks.length,
      data: top10Tracks,
    });
  } catch (error) {
    console.error("Error getting top tracks:", JSON.stringify(error, null, 4));
    return res.status(500).json({
      message: "Error getting top tracks",
      error: error.response ? error.response.data : error.message,
    });
  }
});

app.get("/detailed-stats", async (req, res) => {
  try {
    // Step 1: Get the user's top 20 tracks
    const term = req.query.term || 'medium_term';  // Allow the user to specify the term
    const topTracksData = await spotifyApi.getMyTopTracks({ limit: 20, time_range: term });
    const topTracks = topTracksData.body.items;

    // Extract track IDs
    const trackIds = topTracks.map((track) => track.id);

    // Step 2: Get audio features for these tracks
    const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(trackIds);
    const audioFeatures = audioFeaturesData.body.audio_features;

    // Step 3: Extract and format the required data (tempo and key)
    const detailedStats = audioFeatures.map((feature, index) => ({
      trackName: topTracks[index].name,
      artistName: topTracks[index].artists[0].name,
      tempo: feature.tempo,
      key: feature.key,
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
//top artists
app.get("/top-artists", async (req, res) => {
  const { term } = req.query;
  const validTerms = ["short_term", "medium_term", "long_term"];
  const timeRange = validTerms.includes(term) ? term : "medium_term";

  try {
    const topArtistsResponse = await spotifyApi.getMyTopArtists({ time_range: timeRange });
    const topArtists = topArtistsResponse.body.items;
    const top10Artists = topArtists.slice(0, 10).map(artist => ({
      name: artist.name,
      popularity: artist.popularity,
      genres: artist.genres,
      images: artist.images,
      externalUrl: artist.external_urls.spotify
    }));

    // Send the response
    return res.json({
      message: "Success",
      total_artists: top10Artists.length,
      data: top10Artists,
    });
  } catch (error) {
    console.error("Error getting top artists:", JSON.stringify(error, null, 4));
    return res.status(500).json({
      message: "Error getting top artists",
      error: error.response ? error.response.data : error.message,
    });
  }
});  
  
// DJ HB 

app.post ("/dj" , async (req, res) => {
  const {
    genre,
    mood,
    tempo,
    popularity,
    danceability,
  } = req.body; 
  //‼️TODO: CHECK ALL GENRES FROM API TO DOUBLE CHECK IF ITS EXACTLY WRITTEN SAME WAY  ‼️
  const minValence = mood ? parseFloat(mood) * 0.9  : undefined;
  const maxValence = mood ? parseFloat(mood) * 1.1  : undefined;
  const minTempo = tempo ? parseFloat(tempo) * 0.9 : undefined;
  const maxTempo = tempo ? parseFloat(tempo) * 1.1 : undefined;
  const minPopularity = popularity ? parseFloat(popularity)-10 : undefined;
  const maxPopularity = popularity ? parseFloat(popularity)+10 : undefined;
  const minDanceability  = danceability ? parseFloat(danceability) * 0.9  : undefined;
  const maxDanceability = danceability ? parseFloat(danceability) * 1.1 : undefined;

  const options = {
    seed_genres: genre || "pop",
    min_valence: minValence,
    max_valence: maxValence,
    min_tempo: minTempo,
    max_tempo: maxTempo,
    min_popularity: minPopularity,
    max_popularity: maxPopularity,
    min_danceability:minDanceability,
    max_danceability:maxDanceability,
  }
  try {
    const DJHubResponse = await spotifyApi.getRecommendations(options);
    console.log(options);
    const DJHubSuggestedSongs = DJHubResponse.body.tracks;
    const DJHubSuggested20Songs = DJHubSuggestedSongs.slice(0, 20).map(track => ({
      id: track.id,
      songName: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      popularity: track.popularity,
      album_cover: track.album.images.length > 0 ? track.album.images[0].url : null,
      embedUri: `https://open.spotify.com/embed/track/${track.id}`
    }));
    console.log(DJHubSuggested20Songs);
    return res.json({
      message: "yay",
      data: DJHubSuggested20Songs,
    });

  } catch (error) {
    if (error.statusCode === 429) {
      const retryAfter = error.headers['retry-after'] || 60;
      console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
      return res.status(429).send(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
    }
    console.error("Error fetching recommendations:", error);
    res.status(error.statusCode).send('An error occurred while fetching recommendations.');
  }
});

  
//artist name tracks.artists.name
//song name tracks.name
//song preview tracks.preview_url
//track.id to fetch other things



// randomising function that can be re-used if needed
function getRandomElements(arr, num) {
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

app.get("/recommendations", async (req, res) => {
  try {
    if (!spotifyApi.getAccessToken()) {
      return res.status(401).send("No access token available");
    }

    const topTracksResponse = await spotifyApi.getMyTopTracks({ limit: 10 });
    const topArtistsResponse = await spotifyApi.getMyTopArtists({ limit: 10 });

    const seedTracks = topTracksResponse.body.items.map(track => track.id);
    const seedArtists = topArtistsResponse.body.items.map(artist => artist.id);

    console.log("Seed Tracks IDs:", seedTracks);
    console.log("Seed Artists IDs:", seedArtists);

    const randomSeedTracks = getRandomElements(seedTracks, 3);
    const randomSeedArtists = getRandomElements(seedArtists, 2);

    const recommendationsResponse = await spotifyApi.getRecommendations({
      seed_tracks: randomSeedTracks, 
      seed_artists: randomSeedArtists, 
      limit: 20, 
    });

    console.log("Recommendations Response:", JSON.stringify(recommendationsResponse, null, 2));

    
    const recommendations = recommendationsResponse.body.tracks;

    // logging info for each track
    console.log("Recommended Tracks:");
    recommendations.forEach((track, index) => {
      console.log(`${index + 1}: ${track.name} by ${track.artists.map(artist => artist.name).join(", ")}`);
    });

    res.json(recommendations.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => artist.name),
      album: track.album.name,
      albumCover: track.album.images[0].url
    })));

  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).send("Failed to get recommendations");
  }
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

// a song to try : 6D8y7Bck8h11byRY88Pt2z


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


 
