
import React, { useState, useEffect } from 'react';
import { Container, Card, Image, Spinner } from 'react-bootstrap';
import defaultAvatar from './1.png';
import './profile.css'; 
import ReusableButton from '../ReusableButton/ReusableButton';
import { Link } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const UserProfile = () => {
  useEffect(() => {
    AOS.init({ 
      duration: 1000,  
      offset: 120,     
      once: true, 
     });
  }, []);

  const [userProfile, setUserProfile] = useState({
    display_name: '',
    email: '',
    followers: { total: 0 },
    country: '', 
    product: '', 
    images: [], 
    height: 0,
    width: 0
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5001/me");
        const data = await response.json();
        console.log(data); 
        setUserProfile(data); 
        
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile(); 
  }, []);

  useEffect(() => {
    console.log("Current user profile data", userProfile); 
  }, [userProfile]);

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }
  const profileImageUrl =
    userProfile.images && userProfile.images.length > 0 ? userProfile.images[0].url : defaultAvatar;

  return (
    <Container data-aos="fade-up" className="profile-container">
      <h1 className="profile-title">Your Profile</h1>
      <Card className="profile-card">
        <Card.Body className="profile-card-body">
          <Image src={profileImageUrl} roundedCircle className="profile-image mb-3" />
          <Card.Title className="profile-name">{userProfile.display_name}</Card.Title>
          <Card.Text className="profile-text">
            <strong>Email:</strong> {userProfile.email}
          </Card.Text>
          <Card.Text className="profile-text">
            <strong>Followers:</strong> {userProfile.followers.total}
          </Card.Text>
          <Card.Text className="profile-text">
            <strong>Country:</strong> {userProfile.country}
          </Card.Text>
          <Card.Text className="profile-text">
            <strong>Subscription:</strong> {userProfile.product}
          </Card.Text>
        </Card.Body>
        <Link to="/detailed-stats ">
          <ReusableButton text="My Stats" color="pink" />
        </Link>
      </Card>
    </Container>
  );
};

export default UserProfile;
