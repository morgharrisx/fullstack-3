import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/me", async (req, res) => {
        spotifyApi.getMe().then((data)=> {
        console.log('Some information about the authenticated user', data.body);
    
        return res.json(data.body)
        }) .catch((err) => {
        console.error('Error getting user profile:', err);
        return res.status(500).json({ error: 'Failed to fetch user profile' });
    });
    })

    return router;
};
