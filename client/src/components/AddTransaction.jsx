import React, { useState } from 'react';
import { addTransaction } from '../api';
import "../style/addTransaction.css";

export default function AddTransaction({ fetchTransactions, setBudget }) {
    const [formData, setFormData] = useState({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction(formData);
        fetchTransactions(); // Update transactions
        setFormData({ type: 'expense', amount: '', category: '', description: '', date: '' });
        setBudget();
    };

    return (
        <form onSubmit={handleSubmit} className="container mb-4">
            <div className="row g-2">
                <div className="col-lg-2 col-md-6 gap-3">
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-3 form-check">
                            <input
                                className="form-check-input"
                                required
                                type="radio"
                                name="type"
                                id="income"
                                value="income"
                                checked={formData.type === 'income'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="income">Income</label>
                        </div>
                        <div className="form-check col-md-6 col-3">
                            <input
                                className="form-check-input"
                                required
                                type="radio"
                                name="type"
                                id="expense"
                                value="expense"
                                checked={formData.type === 'expense'}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="expense">Expense</label>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2 col-md-6 col-6">
                    <input required type="number" name="amount" onChange={handleChange} value={formData.amount} placeholder="Amount" className="form-control" />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <input required type="text" name="category" onChange={handleChange} value={formData.category} placeholder="Category" className="form-control" />
                </div>
                <div className="col-lg-2 col-md-4 col-6">
                    <input
                        required
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className='col-lg-2 col-md-4 col-6'>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="col-lg-2 col-md-12 col-12 text-center">
                    <button type="submit" className="btn btn-primary ws-100 ws-md ws-sm">Add</button>
                </div>
            </div>
        </form>
    );
};

