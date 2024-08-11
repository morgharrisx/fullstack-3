import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./BentoGrid.css";
import NumberedList from "./NumberedList/NumberedList";
import FavouriteGenres from "./FavouriteGenres/FavouriteGenres";
import TopBpm from "./TopBpm/TopBpm";
import CompatibleSongs from "./CompatibleSongs/CompatibleSongs";

const BentoGrid = () => {
  return (
    <Container>
      <Row>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={3}>
          <div className="box">
          <NumberedList
                  items={[
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                    "artist",
                  ]}
                  listName={"Artists"}
                ></NumberedList>
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          <Row>
            <Col><div className="box">
            <FavouriteGenres
                  data={[
                    { name: "Rock", value: 400 },
                    { name: "Pop", value: 300 },
                    { name: "Hiphop", value: 300 },
                  ]}
                  width={400}
                  height={400}
                  innerRadius={50}
                  outerRadius={120}
                ></FavouriteGenres>
                 <p className="lead">
                 Get a visual spin on your music tastes! Here are the top 3 genres that have captured your attention recently.
            </p>
              </div></Col>
          </Row>
          <Row className="mt-3">
            <Col className="mb-3"  xs={12} sm={12} md={12} lg={4}>
              <div  className="box">
              <TopBpm
      data={[
        { name: "Genre 1", bpm: 120 },
        { name: "Genre 2", bpm: 128 },
        { name: "Genre 3", bpm: 135 },
      ]}
      width={400}
      height={200}
    />
              </div>
            </Col>
            <Col className="mb-3" xs={12} sm={12} md={12} lg={8}>
              <div  className="box">4</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={5}>
          <div className="box">5</div>
        </Col>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={4}>
          <div className="box">6</div>
        </Col>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={3}>
          <div className="box">7</div>
        </Col>
      </Row>
    </Container>
  );
};

export default BentoGrid;
