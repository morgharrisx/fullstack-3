import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get('/mood', async (req, res) => {
        try {
            const data = await spotifyApi.getMyTopTracks({ limit: 20 });
            const topTracks = data.body.items;
            const trackIds = topTracks.map(track => track.id);
            const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(trackIds);
            const audioFeatures = audioFeaturesData.body.audio_features;
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
            res.json({ average_valence: averageValence });
        } catch (error) {
            console.error('Error fetching top tracks or audio features:', error);
            res.status(500).send('Error fetching top tracks or audio features');
        }
    });

  return router;
};
