import { React, useState } from 'react';
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons for actions
import "../components/style/transactionList.css";
import { mdiContentSaveEdit, mdiCancel } from '@mdi/js';
import Icon from '@mdi/react';


export default function TransactionList ({
    transactions,
    handleDeleteTransaction,
    handleEditTransaction,
    editTransactionId,
    editedTransaction,
    handleEditChange,
    handleSaveTransaction,
    handleCancelEdit,
    handleShowMore,
    hasMore,
    handleShowLess,
    canShowLess,
}) {

    // State for filter options
    const [filters, setFilters] = useState({
        category: "",
        type: "",
        date: "",
    });

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    // Filter transactions
    const filteredTransactions = transactions.filter((transaction) => {
        const matchesCategory =
            !filters.category || transaction.category === filters.category;
        const matchesType = !filters.type || transaction.type === filters.type;
        const matchesDate =
            !filters.date ||
            new Date(transaction.date).toLocaleDateString() ===
            new Date(filters.date).toLocaleDateString();

        return matchesCategory && matchesType && matchesDate;
    });

    return (
        <div className="transaction-list">
            <div className="filters row mb-3">
                {/* Category Filter */}
                <div className="col-md-4">
                    <label htmlFor="category" className="form-label">
                        Filter by Category
                    </label>
                    <input
                        type="text"
                        name="category"
                        id="category"
                        className="form-control"
                        value={filters.category}
                        onChange={handleFilterChange}
                        placeholder="Enter category"
                    />
                </div>

                {/* Type Filter */}
                <div className="col-md-4">
                    <label htmlFor="type" className="form-label">
                        Filter by Type
                    </label>
                    <select
                        name="type"
                        id="type"
                        className="form-select"
                        value={filters.type}
                        onChange={handleFilterChange}
                    >
                        <option value="">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                {/* Date Filter */}
                <div className="col-md-4">
                    <label htmlFor="date" className="form-label">
                        Filter by Date
                    </label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        className="form-control"
                        value={filters.date}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>

            <div className="table-responsive text-center">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction._id}>
                                {/* Editable fields when in edit mode */}
                                {editTransactionId === transaction._id ? (
                                    <>
                                        <td>
                                            <select
                                                value={editedTransaction.type || ""}
                                                onChange={(e) =>
                                                    handleEditChange("type", e.target.value)
                                                }
                                                className="form-select"
                                            >
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                value={editedTransaction.amount.toFixed(2) || ""}
                                                onChange={(e) =>
                                                    handleEditChange("amount", e.target.value)
                                                }
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editedTransaction.category || ""}
                                                onChange={(e) =>
                                                    handleEditChange("category", e.target.value)
                                                }
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                value={editedTransaction.description || ""}
                                                onChange={(e) =>
                                                    handleEditChange("description", e.target.value)
                                                }
                                                className="form-control"
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                value={new Date(editedTransaction.date).toISOString().substr(0, 10) || ""}
                                                onChange={(e) =>
                                                    handleEditChange("date", e.target.value)
                                                }

                                                className="form-control"
                                            />
                                        </td>




                                        <td>
                                            <button
                                                onClick={() => handleSaveTransaction(transaction._id)}
                                                className="btn btn-sm"
                                            >
                                                <Icon path={mdiContentSaveEdit} size={1} style={{ color: "green" }} />
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="btn btn-sm"
                                            >
                                                <Icon path={mdiCancel} size={1} style={{ color: "grey" }} />
                                            </button>
                                        </td>
                                    </>
                                ) : (
                                    // Display fields when not in edit mode
                                    <>
                                        <td
                                            className={
                                                transaction.type === "income"
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                        >
                                            {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                                        </td>

                                        <td>₹{transaction.amount.toFixed(2)}</td>
                                        <td>{transaction.category}</td>

                                        <td>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</td>

                                        <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                        <td>
                                            <button
                                                onClick={() => handleEditTransaction(transaction)}
                                                className="btn btn-sm me-2"
                                                disabled={editTransactionId !== null} // Disable editing other rows
                                            >
                                                <FaEdit className='fs-5' style={{ color: "blue" }} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteTransaction(transaction._id)
                                                }
                                                className="btn btn-sm"
                                                disabled={editTransactionId !== null} // Disable delete when in edit mode
                                            >
                                                <FaTrashAlt className='fs-5' style={{ color: "red" }} />
                                            </button>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Show More and Show Less buttons */}
                <div className="text-center mt-3">
                    {hasMore && (
                        <button className="btn btn-primary mx-2" onClick={handleShowMore}>
                            Show More
                        </button>
                    )}
                    {canShowLess && (
                        <button className="btn btn-secondary mx-2" onClick={handleShowLess}>
                            Show Less
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

