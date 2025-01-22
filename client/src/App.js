import React from 'react';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">BudgetWise</h1>
            <Dashboard />
        </div>
    );
};

export default App;
