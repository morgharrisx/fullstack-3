//This is for if we ever needed authentication in the frontend w/ access token in url

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Authentication = () => {
  const [accessToken, setAccessToken] = useState(null);
  const navigate = useNavigate();

  // Function to start the authentication process
  const authenticateUser = () => {
    // Redirect user to Spotify login via your backend
    window.location.href = 'http://localhost:5001/login';
  };

  // Function to extract the access token from URL after redirect
  const getAccessTokenFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('access_token');
  };

  useEffect(() => {
    // Check if the access token is in the URL after the user is redirected back
    const token = getAccessTokenFromUrl();
    if (token) {
      setAccessToken(token);
      localStorage.setItem('spotify_access_token', token);
      navigate('/dashboard');
      // Optionally, store the token in local storage/session storage
     
    }
  }, []);

  return (
    <div>
      {!accessToken ? (
        <button onClick={authenticateUser}>Login with Spotify</button>
      ) : (
        <p>Logged in! You can now make API requests.</p>
      )}
    </div>
  );
};

export default Authentication;

