import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios"; // not using currently
dotenv.config({path :"./api/.env"});

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
    "user-top-read"
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
      res.redirect(`http://localhost:3000/dashboard?access_token=${accessToken}`);

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

app.get("/search", async (req, res)=>{
    const {q} =  req.query
    console.log(spotifyApi.accessToken)
    spotifyApi.searchTracks(q).then((data)=>{
      return res.json({data})
    }).catch((error)=>{
      console.error("Error:", error);
      res.send("Err searching")
    })
})
//top-tracks
app.get("/top-tracks", async (req, res) => {
  const { term } = req.query;
  const validTerms = ["short_term", "medium_term", "long_term"];
  const timeRange = validTerms.includes(term) ? term : "medium_term";

  try {
    const topTracksResponse = await spotifyApi.getMyTopTracks({ time_range: timeRange });
    const topTracks = topTracksResponse.body.items;
    const top10Tracks = topTracks.slice(0, 10).map(track => ({
      name: track.name,
      album: track.album.name,
      artists: track.artists.map(artist => artist.name),
      popularity: track.popularity,
      externalUrl: track.external_urls.spotify,
      images: track.album.images
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


// DJ HB 
app.use(express.json());

app.post ("/dj" , async (req, res) => {
  const {
    genre,
    mood,
    tempo,
    popularity,
    instrumentalness,
    danceability,
    energy
  } = req.body;
  
  const minValence = mood ? parseFloat(mood) * 0.9 : 0;
  const maxValence = mood ? parseFloat(mood) * 1.1 : 1;
  const minTempo = tempo ? parseFloat(tempo) * 0.9 : 0;
  const maxTempo = tempo ? parseFloat(tempo) * 1.1 : 200;
  const minPopularity = popularity ? parseFloat(popularity)-10 : 0;
  const maxPopularity = popularity ? parseFloat(popularity)+10 : 1;
  const minInstrumentalness = instrumentalness ? parseFloat(instrumentalness) * 0.9 : 0;
  const maxInstrumentalness = instrumentalness ? parseFloat(instrumentalness) * 1.1 : 1;
  const minDanceability  = danceability ? parseFloat(danceability) * 0.9 : 0;
  const maxDanceability = danceability ? parseFloat(danceability) * 1.1 : 1;
  const minEnergy = energy ? parseFloat(energy) * 0.9 : 0;
  const maxEnergy = energy ? parseFloat(energy) * 1.1 : 1;

  const options = {
    seed_genres: genre || "pop",
    min_valence: minValence,
    max_valence: maxValence,
    min_tempo: minTempo,
    max_tempo: maxTempo,
    min_popularity: minPopularity,
    max_popularity: maxPopularity,
    min_instrumentalness:minInstrumentalness,
    max_instrumentalness: maxInstrumentalness,
    min_danceability:minDanceability,
    max_danceability:maxDanceability,
    min_energy:minEnergy,
    max_energy:maxEnergy
  }
  try {
    const DJHubResponse = await spotifyApi.getRecommendations(options);
    const DJHubSuggestedSongs = DJHubResponse.body.tracks;
    const DJHubSuggested20Songs = DJHubSuggestedSongs.slice(0, 20).map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => artist.name).join(', '),
      popularity: track.popularity,
      album_cover:track.album.images.url,
      songPreview: track.preview_url//even though it exists keep coming null????
    }));
    return res.json({
      message: "yay",
      data: DJHubSuggested20Songs,
    });

  } catch (error) {
    console.error("Error fetching recommendations:", error);
    res.status(500).send('An error occurred while fetching recommendations.');
  }
});

  
//artist name tracks.artists.name
//song name tracks.name
//song preview tracks.preview_url
//track.id to fetch other things
