import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavScrollExample from './Navbar/navbar';
import ControlledCarousel from './Carousel/ControlledCarousel';
import DetailedStats from './DetailedStats/DetailedStats';
import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
import Footer from './Footer/Footer';
import Dashboard from './Dashboard/Dashboard';
import RecommendedPlaylist from './RecommendedPlaylist'; 
import Profile from './Profile/Profile';
import ContactForm from './ContactForm/ContactForm';
import Authentication from './login/login';
import { AuthProvider } from './IsLoggedIn/AuthProvider';
import ProtectedRoute from './IsLoggedIn/ProtectedRoutes';

function App() { 
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <NavScrollExample/>
          <Routes>
            <Route path="/" element={<><ControlledCarousel/><Footer/> </>} />
            <Route path="/contact" element={<><ContactForm/><Footer/> </>} />
            <Route path="/login" element={<Authentication/>}/>

            <Route path="/profile" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
            <Route path="/detailed-stats" element={<ProtectedRoute element={DetailedStats} />} />
            <Route path="/dj-hub" element={<ProtectedRoute element={PlaylistGenerator} />} />
            <Route path="/smart-recommendations" element={<ProtectedRoute element={RecommendedPlaylist} />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;

// import './App.css';
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavScrollExample from './Navbar/navbar';
// import ControlledCarousel from './Carousel/ControlledCarousel';
// import DetailedStats from './DetailedStats/DetailedStats';
// import PlaylistGenerator from './PlaylistGenerator/PlaylistGenerator';
// import Footer from './Footer/Footer';
// import Dashboard from './Dashboard/Dashboard';
// import RecommendedPlaylist from './RecommendedPlaylist';
// import Profile from './Profile/Profile';
// import ContactForm from './ContactForm/ContactForm';
// import { AuthProvider } from './IsLoggedIn/AuthProvider';
// import ProtectedRoute from './IsLoggedIn/ProtectedRoute';

// function App() {
//   return (
//     <AuthProvider>
//       <div className="App">
//         <Router>
//           <NavScrollExample />
//           <Routes>
//             <Route path="/" element={<><ControlledCarousel /><Footer /></>} />
//             <Route path="/profile" element={<><Profile /><Footer /></>} />
//             <Route path="/contact" element={<><ContactForm /><Footer /></>} />
//             <Route path="/smart-recommendations" element={<><RecommendedPlaylist /><Footer /></>} />
//             {/* Protected Routes */}
//             <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
//             <Route path="/detailed-stats" element={<ProtectedRoute element={DetailedStats} />} />
//             <Route path="/dj-hub" element={<ProtectedRoute element={PlaylistGenerator} />} />
//           </Routes>
//         </Router>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;
