import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './AuthProvider'; // Adjust the import path as necessary
import ProtectedRoute from './ProtectedRoute'; // Adjust the import path as necessary
import HomePage from './HomePage';
import Dashboard from './Dashboard';
import LoginPage from './LoginPage';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <ProtectedRoute path="/dashboard" component={Dashboard} />
                    <Route path="/" component={HomePage} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;
