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
  ];
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

app.get("/top-track", async (req, res) => {
  spotifyApi
    .getMyTopTracks({ time_range: "medium_term" })
    .then((topTracksResponse) => {
      const trackData = topTracksResponse.body.items.map(
        (topTrackResponse) => ({
          song_name: topTrackResponse.name,
          artist_names: topTrackResponse.artists.map((artist) => artist.name),
        })
      );

      return res.json({
        message: "Success",
        total: trackData.length,
        data: trackData,
      });
    })
    .catch((error) => {
      console.error("Error:", JSON.stringify(error, null, 4));
      res.send("Error getting top tracks");
    });
});



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

    // slicing number of seeds because spotify only allows 5 seeds across values. could work on randomising it
    const recommendationsResponse = await spotifyApi.getRecommendations({
      seed_tracks: seedTracks.slice(0, 3), 
      seed_artists: seedArtists.slice(0, 2), 
      limit: 10, // we can change the number here, not sure how many we need?
    });

    console.log("Recommendations Response:", JSON.stringify(recommendationsResponse, null, 2));

    
    const recommendations = recommendationsResponse.body.tracks;

    // logging info for each track
    console.log("Recommended Tracks:");
    recommendations.forEach((track, index) => {
      console.log(`${index + 1}: ${track.name} by ${track.artists.map(artist => artist.name).join(", ")}`);
    });

    res.json(recommendations.map(track => ({
      name: track.name,
      artists: track.artists.map(artist => artist.name),
      album: track.album.name,
    })));

  } catch (error) {
    console.error("Error fetching recommendations:", error.message);
    res.status(500).send("Failed to get recommendations");
  }
});
