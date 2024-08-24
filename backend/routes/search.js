import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
    router.get("/search", async (req, res) => {
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
    
  return router;
};

  