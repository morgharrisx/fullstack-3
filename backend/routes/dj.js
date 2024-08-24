import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.post ("/dj" , async (req, res) => {
    const { genre, mood, tempo, popularity, danceability,} = req.body; 

    const minValence = mood ? parseFloat(mood) * 0.9  : undefined;
    const maxValence = mood ? parseFloat(mood) * 1.1  : undefined;
    const minTempo = tempo ? parseFloat(tempo) * 0.9 : undefined;
    const maxTempo = tempo ? parseFloat(tempo) * 1.1 : undefined;
    const minPopularity = popularity ? parseFloat(popularity)-10 : undefined;
    const maxPopularity = popularity ? parseFloat(popularity)+10 : undefined;
    const minDanceability  = danceability ? parseFloat(danceability) * 0.9  : undefined;
    const maxDanceability = danceability ? parseFloat(danceability) * 1.1 : undefined;

    const options = {
        seed_genres: genre || "pop",
        min_valence: minValence,
        max_valence: maxValence,
        min_tempo: minTempo,
        max_tempo: maxTempo,
        min_popularity: minPopularity,
        max_popularity: maxPopularity,
        min_danceability:minDanceability,
        max_danceability:maxDanceability,
    }
    try {
        const DJHubResponse = await spotifyApi.getRecommendations(options);
        console.log(options);
        const DJHubSuggestedSongs = DJHubResponse.body.tracks;
        const DJHubSuggested20Songs = DJHubSuggestedSongs.slice(0, 20).map(track => ({
        id: track.id,
        name:track.name,
        album: track.album.name,
        popularity: track.popularity,
        artist:  track.artists.map(artist => artist.name),
        embedUri: `https://open.spotify.com/embed/track/${track.id}`
        }));
        const DJHubSuggestedSongsIDs = DJHubSuggested20Songs.map(song=>song.id);
        const DJHubSuggestedSongsFeatsResponse = await spotifyApi.getAudioFeaturesForTracks(DJHubSuggestedSongsIDs);
        const DJHubSuggestedSongsFeats = DJHubSuggestedSongsFeatsResponse.body.audio_features;
        DJHubSuggestedSongsFeats.map(song=>({
        id: song.id,
        valence: song.valence,
        tempo: song.tempo,
        danceability: song.danceability
        }))

        const combinedData = DJHubSuggested20Songs.map(song => {
        const features = DJHubSuggestedSongsFeats.find(feat => feat.id === song.id);
        return {
            ...song,
            valence: features.valence,
            tempo: features.tempo,
            danceability: features.danceability,
            energy: features.energy,
        };
        });

        return res.json({
        message: "Success",
        data: combinedData,
        });

    } catch (error) {
        if (error.statusCode === 429) {
        const retryAfter = error.headers['retry-after'] || 60;
        console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
        return res.status(429).json({ retryAfter: Math.ceil(retryAfter / 60) });  // Send retryAfter in minutes
        }
        console.error("Error fetching recommendations:", error);
        res.status(error.statusCode).send('An error occurred while fetching recommendations.');
    }
    });


    return router;
};
