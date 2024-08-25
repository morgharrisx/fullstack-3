import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/top-artists", async (req, res) => {
    const { term } = req.query;
    const validTerms = ["short_term", "medium_term", "long_term"];
    const timeRange = validTerms.includes(term) ? term : "medium_term";
  
    try {
      const topArtistsResponse = await spotifyApi.getMyTopArtists({ time_range: timeRange });
      const topArtists = topArtistsResponse.body.items;
      const top10Artists = topArtists.slice(0, 10).map(artist => ({
        name: artist.name,
        popularity: artist.popularity,
        genres: artist.genres,
        images: artist.images,
        externalUrl: artist.external_urls.spotify
      }));
  
      // Send the response
      return res.json({
        message: "Success",
        total_artists: top10Artists.length,
        data: top10Artists,
      });
    } catch (error) {
      console.error("Error getting top artists:", JSON.stringify(error, null, 4));
      return res.status(500).json({
        message: "Error getting top artists",
        error: error.response ? error.response.data : error.message,
      });
    }
  });  
    
  
  return router;
};
