
// // randomising function that can be re-used if needed
function getRandomElements(arr, num) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  
import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/recommendations", async (req, res) => {
        try {
        if (!spotifyApi.getAccessToken()) {
            return res.status(401).send("No access token available");
        }
    
        const topTracksResponse = await spotifyApi.getMyTopTracks({ limit: 10 });
        const topArtistsResponse = await spotifyApi.getMyTopArtists({ limit: 10 });
    
        const seedTracks = topTracksResponse.body.items.map(track => track.id);
        const seedArtists = topArtistsResponse.body.items.map(artist => artist.id);

        const randomSeedTracks = getRandomElements(seedTracks, 3);
        const randomSeedArtists = getRandomElements(seedArtists, 2);
    
        const recommendationsResponse = await spotifyApi.getRecommendations({
            seed_tracks: randomSeedTracks, 
            seed_artists: randomSeedArtists, 
            limit: 20, 
        });
    
        const recommendations = recommendationsResponse.body.tracks;
    
        // logging info for each track
        // recommendations.forEach((track, index) => {
        //     console.log(`${index + 1}: ${track.name} by ${track.artists.map(artist => artist.name).join(", ")}`);
        // });
    
        res.json(recommendations.map(track => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map(artist => artist.name),
            album: track.album.name,
            albumCover: track.album.images[0].url
        })));
    
        } catch (error) {
        if (error.statusCode === 429) {
            const retryAfter = error.headers['retry-after'] || 60;
            console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds.`);
            return res.status(429).json({ retryAfter: Math.ceil(retryAfter / 60) });  // Send retryAfter in minutes
        }
        console.error("Error fetching recommendations:",JSON.stringify(error, null, 2));
        res.status(error.statusCode).send('An error occurred while fetching recommendations.');
        }
    });
  
      
  return router;
};
