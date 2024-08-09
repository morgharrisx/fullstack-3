import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./BentoGrid.css";

const BentoGrid = () => {
  return (
    <Container>
      <Row>
        <Col className="mb-3" xs={12} sm={12} md={12} lg={3}>
          <div className="box">1</div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={9}>
          <Row>
            <Col><div className="box">2</div></Col>
          </Row>
          <Row className="mt-3">
            <Col className="mb-3"  xs={12} sm={12} md={12} lg={4}>
              <div  className="box">3</div>
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
