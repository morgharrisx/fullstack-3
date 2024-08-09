import React from 'react'
import './Dashboard.css'
import { Container, Row, Col } from 'react-bootstrap'

const Dashboard = () => {
  return (
    <Container className='dashboard-container'>
        <Row className='mt-3'>
            <Col xs={12} sm={12} md={12} lg={12}>
                <div className='box'>1</div>
            </Col>
        </Row>
        <Row className='mt-3'>
            <Col xs={12} sm={12} md={12} lg={4}>
                     <div className='box'>2</div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={4}>  <div className='box'>3</div></Col>
            <Col xs={12} sm={12} md={12} lg={4}>  <div className='box'>4</div></Col>
        </Row>
    </Container>
  )
}

export default Dashboard;