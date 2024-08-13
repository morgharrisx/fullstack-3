import React, { useState } from 'react';
import { Container, Card, Image, Spinner } from 'react-bootstrap';
import defaultAvatar from './1.png';
import './profile.css'; 
import ReusableButton from '../ReusableButton/ReusableButton';
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    display_name: 'Poo',
    email: 'poo@poo.com',
    followers: { total: 123 },
    country: 'ES', 
    product: 'very very vip premium', 
    images: [], 
  });
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
    <Container className="profile-container">
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
        <Link to="/stats">
          <ReusableButton text="My Stats" color="pink" />
        </Link>
      </Card>
    </Container>
  );
};

export default UserProfile;