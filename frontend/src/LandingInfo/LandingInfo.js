import React, {useEffect} from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import LandingImage1 from './1.png';
import LandingImage2 from './2.png';
import LandingImage3 from './3.png';
import ReusableButton from '../ReusableButton/ReusableButton';
import { Link } from 'react-router-dom';
import "./landinginfo.css";
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const LandingPage = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 2000,  
      offset: 120,     
      once: true, 
     });
  }, []);

  const sections = [
    {
      title: 'Discover Your Music DNA',
      text: 'Ever wondered what makes your music taste unique? With VibeFusion, you get detailed analytics of your top tracks, favorite artists, and preferred genres. Dive deeper into your musical identity by exploring your most listened-to musical keys and the moods that define your playlists.',
      image: LandingImage1,
      imageFirst: false,
    },
    {
      title: 'Smart Recommendations Tailored to You',
      text: 'Finding new music has never been easier. VibeFusion’s smart recommendation system uses your listening habits to suggest tracks that match your taste. Whether you\'re into pop, rock, alternative, or any genre in between, our intelligent algorithm curates songs that feel like they were made just for you.',
      image: LandingImage2,
      imageFirst: true,
      reverseOnMobile: true, 
    },
    {
      title: 'Unleash Your Inner DJ',
      text: 'Step into the DJ Hub, where you have the power to create the perfect mix. Input your preferences – from genre to BPM, mood, and more – and VibeFusion will match you with tracks that fit your vibe. Whether you\'re setting the mood for a party or curating your next road trip playlist, the DJ Hub has you covered.',
      image: LandingImage3,
      imageFirst: false,
      button: <Link to="http://localhost:5001/login"><ReusableButton color="green" text="Get Started with VibeFusion" /></Link>,
    },
  ];

  return (
    <Container className="landing-info-container py-5 my-4">
      {sections.map((section, index) => (
       <Row
       key={index}
       className={`align-items-center my-5 ${section.reverseOnMobile ? 'reverse-mobile' : ''}`}
       data-aos="fade-up"
     >
          {section.imageFirst ? (
            <>
              <Col xs={12} sm={12} md={6} lg={6} className="text-center p-4">
                <Image src={section.image} alt="VibeFusion preview" fluid />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} className="text-center text-md-left px-5">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.button}
              </Col>
            </>
          ) : (
            <>
              <Col md={6} className="text-center text-md-left px-5">
                <h2>{section.title}</h2>
                <p>{section.text}</p>
                {section.button}
              </Col>
              <Col md={6} className="text-center p-4">
                <Image src={section.image} alt="VibeFusion preview" fluid />
              </Col>
            </>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default LandingPage;
