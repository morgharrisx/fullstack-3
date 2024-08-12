import PlaylistItem from './PlaylistItem/PlaylistItem';

function SuggestedPlaylist() {
    return (
          <div className="playlist">
            <br></br>
            <PlaylistItem 
              songName="Please Please Please"
              album="Short n' Sweet"
              artist="Sabrina Carpenter"
              views="503,795,279"
              runtime="3:06"
              albumCover="https://upload.wikimedia.org/wikipedia/en/f/fd/Short_n%27_Sweet_-_Sabrina_Carpenter.png"
            />
            <PlaylistItem 
              songName="CHIHIRO"
              album="HIT ME HARD AND SOFT"
              artist="Billie Eilish"
              views="334,149,206"
              runtime="5:00"
              albumCover="https://upload.wikimedia.org/wikipedia/en/a/aa/Billie_Eilish_-_Hit_Me_Hard_and_Soft.png"
            />
          </div>
      );
    }
export default SuggestedPlaylist;