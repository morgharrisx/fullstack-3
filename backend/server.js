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


app.get ("/dj" , async (req, res) => {
  const {
  const options = {
    seed_genres: "pop"
  }
  const songs = await spotifyApi.getRecommendations(options);
  res.send(songs.body);
});

  

