import React, { useState } from 'react';
import { setBudget } from '../api';

export default function Budget({fetchBudget,totalBudget,currentBudget}) {
    const [budget, setBudgetState] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        await setBudget(budget);
        fetchBudget();
        setBudgetState('');
    };

    return (
        <div className="mb-4">
            <h4>Set Monthly Budget</h4>
            <p>Total Set Budget: ₹{totalBudget || 'Not Set'}</p>
            <p>Current Budget: ₹{currentBudget || 'Not Set'}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Enter budget"
                    value={budget}
                    onChange={(e) => setBudgetState(e.target.value)}
                    className="form-control mb-2"
                />
                <button type="submit" className="btn btn-success">Set Budget</button>
            </form>
        </div>
    );
};

