import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get('/top-tracks', async (req, res) => {
    const { term } = req.query;
    const validTerms = ["short_term", "medium_term", "long_term"];
    const timeRange = validTerms.includes(term) ? term : "medium_term";

    try {
      const topTracksResponse = await spotifyApi.getMyTopTracks({
        time_range: timeRange,
      });
      const topTracks = topTracksResponse.body.items;
      const top10Tracks = topTracks.slice(0, 10).map((track) => ({
        name: track.name,
        album: track.album.name,
        artists: track.artists.map((artist) => artist.name),
        popularity: track.popularity,
        externalUrl: track.external_urls.spotify,
        images: track.album.images,
      }));

      return res.json({
        message: "Success",
        total_tracks: top10Tracks.length,
        data: top10Tracks,
      });
    } catch (error) {
      console.error("Error getting top tracks:", JSON.stringify(error, null, 4));
      return res.status(500).json({
        message: "Error getting top tracks",
        error: error.response ? error.response.data : error.message,
      });
    }
  });

  return router;
};
