//This is for if we ever needed authentication in the frontend w/ access token in url

import React, { useEffect, useState } from 'react';

const Authentication = ({ onLogin, onLogout }) => {
  const [accessToken, setAccessToken] = useState(null);

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
      onLogin();
      // Optionally, store the token in local storage/session storage
      //localStorage.setItem('spotify_access_token', token);
    }
  }, [onLogin]);

  // Logout function
  const handleLogout = () => {
    setAccessToken(null); // Clear the access token
    // Optionally remove the token from local storage
    // localStorage.removeItem('spotify_access_token', token);
    onLogout(); // Call onLogout prop to inform parent component of logout
  };

  return (
    <div>
      {!accessToken ? (
        <button onClick={authenticateUser}>Login with Spotify</button>
      ) : (
        <div>
          <p>Logged in! You can now make API requests.</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;