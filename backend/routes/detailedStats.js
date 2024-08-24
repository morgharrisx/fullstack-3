import express from 'express';

const router = express.Router();

export default (spotifyApi) => {

    router.get("/detailed-stats", async (req, res) => {
        try {
        // Step 1: Get the user's top 20 tracks
        const term = req.query.term || 'medium_term';  // Allow the user to specify the term
        const topTracksData = await spotifyApi.getMyTopTracks({ limit: 20, time_range: term });
        const topTracks = topTracksData.body.items;
    
        // Extract track IDs
        const trackIds = topTracks.map((track) => track.id);
    
        // Step 2: Get audio features for these tracks
        const audioFeaturesData = await spotifyApi.getAudioFeaturesForTracks(trackIds);
        const audioFeatures = audioFeaturesData.body.audio_features;
    
        // Step 3: Extract and format the required data (tempo and key)
        const detailedStats = audioFeatures.map((feature, index) => ({
            trackName: topTracks[index].name,
            artistName: topTracks[index].artists[0].name,
            tempo: feature.tempo,
            key: feature.key,
            duration_ms: feature.duration_ms,
            mode: feature.mode,
            trackId: topTracks[index].id,
        }));
    
        // Step 4: Sort by BPM (tempo) in descending order and select the top 3
        const top3BPMTracks = detailedStats
            .sort((a, b) => b.tempo - a.tempo)
            .slice(0, 3);
    
        // Step 5: Send the top 3 tracks as a JSON response
        return res.json(top3BPMTracks);
        } catch (err) {
        console.error("Something went wrong!", err);
        return res.status(500).json({ error: "Failed to fetch audio features" });
        }
    });

    return router;
};
