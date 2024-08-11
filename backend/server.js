import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import axios from "axios"; // not using currently 
dotenv.config();

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
  const scopes = ["user-read-private", "user-read-email"];
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
    console.error("Error:", error);
    res.send(`Error:, ${error}`);
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
      res.send("We got it!!");

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


// The below code is using axios and some frontend connecting (not working atm)

// //callback route for spotify response
// app.get('/callback', async (req, res) => {
//   const code = req.query.code || null;

//   try {
//     const response = await axios({
//       method: 'post',
//       url: 'https://accounts.spotify.com/api/token',
//       data: new URLSearchParams({
//         grant_type: 'authorization_code',
//         code: code,
//         redirect_uri: REDIRECT_URI,
//       }),
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
//       },
//     });

//     const { access_token, refresh_token } = response.data;

//     // Redirect to frontend with tokens
//     res.redirect(`http://localhost:5001?access_token=${access_token}&refresh_token=${refresh_token}`);
//   } catch (error) {
//     res.send('Error during authentication');
//   }
// });


// Token and local storage 

    // const [accessToken, setAccessToken] = useState(null);
    // const [refreshToken, setRefreshToken] = useState(null);
  
    // useEffect(() => {
    //   // Check if there are tokens in the URL
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const access_token = urlParams.get('access_token');
    //   const refresh_token = urlParams.get('refresh_token');
  
    //   if (access_token) {
    //     setAccessToken(access_token);
    //     localStorage.setItem('access_token', access_token);
    //   }
  
    //   if (refresh_token) {
    //     setRefreshToken(refresh_token);
    //     localStorage.setItem('refresh_token', refresh_token);
    //   }
    // }, []);