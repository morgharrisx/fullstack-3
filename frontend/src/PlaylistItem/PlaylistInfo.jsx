import React from 'react';

function PlaylistInfo(props) {
  return (
    <div>
      <h3>{props.songName}</h3>
      <p>{props.artist}</p>
    </div>
  );
}

export default PlaylistInfo;


