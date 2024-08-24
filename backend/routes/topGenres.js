import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/top-genres", async (req, res) => {
        const { term } = req.query;
        const validTerms = ["short_term", "medium_term", "long_term"];
        const timeRange = validTerms.includes(term) ? term : "medium_term";
    
        try {
        const topArtistsResponse = await spotifyApi.getMyTopArtists({ time_range: timeRange });
        const topArtists = topArtistsResponse.body.items;
    
        //Genres from the top artists
        const genreCount = {};
        topArtists.forEach(artist => {
            artist.genres.forEach(genre => {
            genreCount[genre] = (genreCount[genre] || 0) + 1;
            });
        });
    
        // Sort by count
        const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
        const topGenres = sortedGenres.slice(0, 5).map(([genre, count]) => ({
            genre,
            count
        }));
    
        // response
        return res.json({
            message: "Success",
            total_genres: topGenres.length,
            data: topGenres,
        });
        } catch (error) {
        console.error("Error getting top genres:", JSON.stringify(error, null, 4));
        return res.status(500).json({
            message: "Error getting top genres",
            error: error.response ? error.response.data : error.message,
        });
        }
    });
    
    return router;
};
