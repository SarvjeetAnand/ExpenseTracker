import React from 'react';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from './components/Image';
import Header from './components/Header';

const App = () => {
    return (
        <div>
            <Header />
            <div className="container mt-5">
                <h1 className="text-center"><Image /></h1>
                <Dashboard />
            </div>
        </div>
    );
};

export default App;
