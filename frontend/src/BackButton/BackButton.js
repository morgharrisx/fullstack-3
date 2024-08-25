import React from 'react';
// import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReusableButton from '../ReusableButton/ReusableButton';

const BackButton = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard");
  };

  return ( 
    <ReusableButton text="Go Back to Dashboard"  color={'pink'}
      onClick={goBack} 
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000,
      }}
    >
      Go Back
    </ReusableButton>
  );
};

export default BackButton;
