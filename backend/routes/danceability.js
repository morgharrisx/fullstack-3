import express from 'express';

const router = express.Router();

export default (spotifyApi) => {
  router.get("/danceability", async (req, res) => {
    try {
      const topTracksResponse = await spotifyApi.getMyTopTracks();
      const topTracks = topTracksResponse.body.items;
      const top20TracksID = topTracks.slice(0, 20).map(track => (track.id));
      const audioFeatResponse = await spotifyApi.getAudioFeaturesForTracks(top20TracksID);
      const allAudioFeats = audioFeatResponse.body.audio_features;
      const sortedFeats = allAudioFeats.sort((a,b)=> b.danceability -a.danceability);
      const mostDanceableSong= sortedFeats[0];
      const foundSong = topTracks.find(song => song.id === mostDanceableSong.id);
  
      return res.json({
        message: "Success",
        name: foundSong.name,
        album: foundSong.album.name,
        artist: foundSong.artists.map(artist => artist.name).join(', '),
        embedUri: `https://open.spotify.com/embed/track/${foundSong.id}`
      });
    } catch (error) {
      console.error("Error getting top tracks:", JSON.stringify(error, null, 4));
      return res.status(500).json({
        message: "Error getting danceable song",
        error: error.response ? error.response.data : error.message,
      });
    }
  })
  
  return router;
};