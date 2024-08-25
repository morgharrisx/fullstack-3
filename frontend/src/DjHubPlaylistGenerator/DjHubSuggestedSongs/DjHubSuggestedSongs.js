import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ReusableButton from "../../ReusableButton/ReusableButton";
import "./DjHubSuggestedSongs.css";
import axios from "axios";
import VerticalModal from "../Modal/Modal";

const SuggestedSongs = ({ songs }) => {
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });
  const handleGeneratePlaylist = async () => {
    try {
      const trackUris = songs.map((song) => `spotify:track:${song.id}`);
      const response = await axios.post(
        "http://localhost:5001/create-playlist",
        {trackUris: trackUris,}
      );
      if (response.status === 200) {
        setModalContent({
          title: " 🥳 Playlist created!",
          body: "You'll find it on your Spotify account under the playlist name VibeFusion.",
        });
      } else {
        setModalContent({
          title: "Failure",
          body: "Failed to create playlist.",
        });
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      setModalContent({
        title: "Error",
        body: "An error occurred while creating the playlist.",
      });
    } finally {
      setModalShow(true);
    }
  };
  return (
    <Row>
      <Col xs={12} sm={12} md={12} lg={12}
        className="playlist-generator-col align-items-center mx-2"
      >
        <p className="playlist-generator-suggested-header display-6">
          Suggested Songs
        </p>
        {songs.length > 0 ? (
          <>
            {songs.map((song) => (
              <div
                className="song-container"
                key={song.id}
                style={{ marginBottom: "5px" }}
              >
                <p className="lead">{song.name}</p>
                <iframe
                  src={`https://open.spotify.com/embed/track/${song.id}`}
                  width="700"
                  height="80"
                  title={song.id}
                  frameBorder="0"
                  allowTransparency="true"
                  allow="encrypted-media"
                ></iframe>
              </div>
            ))}
            <ReusableButton
              text="Create Playlist"
              color={"green"}
              onClick={handleGeneratePlaylist}
              className="playlist-generator-button"
            />
          </>
        ) : (
          <p className="lead">
            There are no matching songs with selected criteria
          </p>
        )}
      </Col>
      <VerticalModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
    </Row>
  );
};

export default SuggestedSongs;
