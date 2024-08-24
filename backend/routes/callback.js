import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/callback", async (req, res) => {
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
    
    return router;
};
