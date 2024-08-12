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
      res.send("Success! The callback is working!");

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
  
app.get("/top-track", async (req, res) => {
    spotifyApi
    .getMyTopTracks({ time_range: "medium_term" })
    .then((topTracksResponse) => {
      const trackData = topTracksResponse.body.items.map((topTrackResponse) => ({
        song_name: topTrackResponse.name,
        artist_names: topTrackResponse.artists.map((artist) => artist.name),
      }));

      return res.json({
        message: "Success",
        total: trackData.length,
        data: trackData,
      });
    }).catch((error)=>{
      console.error("Error:", JSON.stringify(error, null, 4));
      res.send("Error getting top tracks");
    });
});

