import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/login", (req, res) => {
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
     
  return router;
};