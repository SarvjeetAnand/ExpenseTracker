import { React, useState } from 'react';
// import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Icons for actions
// import "../style/transactionList.css"; // CSS file for styling
// import { mdiContentSaveEdit, mdiCancel } from '@mdi/js';
// import Icon from '@mdi/react';


// export default function TransactionList ({
//     transactions,
//     handleDeleteTransaction,
//     handleEditTransaction,
//     editTransactionId,
//     editedTransaction,
//     handleEditChange,
//     handleSaveTransaction,
//     handleCancelEdit,
//     handleShowMore,
//     hasMore,
//     handleShowLess,
//     canShowLess,
// }) {

//     // State for filter options
//     const [filters, setFilters] = useState({
//         category: "",
//         type: "",
//         date: "",
//     });

//     // Handle filter change
//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters((prev) => ({ ...prev, [name]: value }));
//     };

//     // Filter transactions
//     const filteredTransactions = transactions.filter((transaction) => {
//         const matchesCategory =
//             !filters.category || transaction.category === filters.category;
//         const matchesType = !filters.type || transaction.type === filters.type;
//         const matchesDate =
//             !filters.date ||
//             new Date(transaction.date).toLocaleDateString() ===
//             new Date(filters.date).toLocaleDateString();

//         return matchesCategory && matchesType && matchesDate;
//     });

//     return (
//         <div className="transaction-list">
//             <div className="filters row mb-3">
//                 {/* Category Filter */}
//                 <div className="col-md-4 col-6 text-center">
//                     <label htmlFor="category" className="form-label">
//                         Filter by Category
//                     </label>
//                     <input
//                         type="text"
//                         name="category"
//                         id="category"
//                         className="form-control"
//                         value={filters.category}
//                         onChange={handleFilterChange}
//                         placeholder="Enter category"
//                     />
//                 </div>

//                 {/* Type Filter */}
//                 <div className="col-md-4 col-6 text-center">
//                     <label htmlFor="type" className="form-label">
//                         Filter by Type
//                     </label>
//                     <select
//                         name="type"
//                         id="type"
//                         className="form-select"
//                         value={filters.type}
//                         onChange={handleFilterChange}
//                     >
//                         <option value="">All</option>
//                         <option value="income">Income</option>
//                         <option value="expense">Expense</option>
//                     </select>
//                 </div>

//                 {/* Date Filter */}
//                 <div className="col-md-4 col-12 text-center">
//                     <label htmlFor="date" className="form-label">
//                         Filter by Date
//                     </label>
//                     <input
//                         type="date"
//                         name="date"
//                         id="date"
//                         className="form-control ws-md"
//                         value={filters.date}
//                         onChange={handleFilterChange}
//                     />
//                 </div>
//             </div>

//             <div className="table-responsive text-center">
//                 <table className="table table-bordered table-striped bg-dark text-light">
//                     <thead>
//                         <tr>
//                             <th>Type</th>
//                             <th>Amount</th>
//                             <th>Category</th>
//                             <th>Description</th>
//                             <th>Date</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredTransactions.map((transaction) => (
//                             <tr key={transaction._id}>
//                                 {/* Editable fields when in edit mode */}
//                                 {editTransactionId === transaction._id ? (
//                                     <>
//                                         <td>
//                                             <select
//                                                 value={editedTransaction.type || ""}
//                                                 onChange={(e) =>
//                                                     handleEditChange("type", e.target.value)
//                                                 }
//                                                 className="form-select"
//                                             >
//                                                 <option value="income">Income</option>
//                                                 <option value="expense">Expense</option>
//                                             </select>
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="number"
//                                                 value={editedTransaction.amount|| ""}
//                                                 onChange={(e) =>
//                                                     handleEditChange("amount", e.target.value)
//                                                 }
//                                                 className="form-control"
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={editedTransaction.category || ""}
//                                                 onChange={(e) =>
//                                                     handleEditChange("category", e.target.value)
//                                                 }
//                                                 className="form-control"
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="text"
//                                                 value={editedTransaction.description || ""}
//                                                 onChange={(e) =>
//                                                     handleEditChange("description", e.target.value)
//                                                 }
//                                                 className="form-control"
//                                             />
//                                         </td>
//                                         <td>
//                                             <input
//                                                 type="date"
//                                                 value={new Date(editedTransaction.date).toISOString().substr(0, 10) || ""}
//                                                 onChange={(e) =>
//                                                     handleEditChange("date", e.target.value)
//                                                 }

//                                                 className="form-control"
//                                             />
//                                         </td>

//                                         <td>
//                                             <button
//                                                 onClick={() => handleSaveTransaction(transaction._id)}
//                                                 className="btn btn-sm"
//                                             >
//                                                 <Icon path={mdiContentSaveEdit} size={1} style={{ color: "green" }} />
//                                             </button>
//                                             <button
//                                                 onClick={handleCancelEdit}
//                                                 className="btn btn-sm"
//                                             >
//                                                 <Icon path={mdiCancel} size={1} style={{ color: "grey" }} />
//                                             </button>
//                                         </td>
//                                     </>
//                                 ) : (
//                                     // Display fields when not in edit mode
//                                     <>
//                                         <td
//                                             className={
//                                                 transaction.type === "income"
//                                                     ? "text-success"
//                                                     : "text-danger"
//                                             }
//                                         >
//                                             {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
//                                         </td>

//                                         <td>₹{transaction.amount.toFixed(2)}</td>
//                                         <td>{transaction.category}</td>

//                                         <td>{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</td>

//                                         <td>{new Date(transaction.date).toLocaleDateString()}</td>
//                                         <td>
//                                             <button
//                                                 onClick={() => handleEditTransaction(transaction)}
//                                                 className="btn btn-sm"
//                                                 disabled={editTransactionId !== null} // Disable editing other rows
//                                             >
//                                                 <FaEdit className='fs-5' style={{ color: "blue" }} />
//                                             </button>
//                                             <button
//                                                 onClick={() =>
//                                                     handleDeleteTransaction(transaction._id)
//                                                 }
//                                                 className="btn btn-sm"
//                                                 disabled={editTransactionId !== null} // Disable delete when in edit mode
//                                             >
//                                                 <FaTrashAlt className='fs-5' style={{ color: "red" }} />
//                                             </button>
//                                         </td>
//                                     </>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

// {/* Show More and Show Less buttons */}
// <div className="text-center mt-3">
//     {hasMore && (
//         <button className="btn btn-primary mx-2" onClick={handleShowMore}>
//             Show More
//         </button>
//     )}
//     {canShowLess && (
//         <button className="btn btn-secondary mx-2" onClick={handleShowLess}>
//             Show Less
//         </button>
//     )}
// </div>
//             </div>
//         </div>
//     );
// };


import {
    TrendingUp,
    TrendingDown,
    Filter,
    Download,
    Edit3,
    Trash2,
    Save,
    X,
    BarChart3
} from 'lucide-react';



const TransactionList = ({
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
}) => {
    const [filters, setFilters] = useState({ category: '', type: '', date: '' });
    const [showFilters, setShowFilters] = useState(false);

    const filteredTransactions = transactions.filter(transaction => {
        const matchesCategory = !filters.category || transaction.category.toLowerCase().includes(filters.category.toLowerCase());
        const matchesType = !filters.type || transaction.type === filters.type;
        const matchesDate = !filters.date || transaction.date === filters.date;
        return matchesCategory && matchesType && matchesDate;
    });


    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 mt-4">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs md:text-xl font-bold text-gray-800 flex items-center gap-3">
                    <BarChart3 className="w-7 h-7 text-indigo-600" />
                    Transaction History
                </h2>
                <div className="text-xs md:text-lg flex items-center gap-3">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${showFilters
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        <Filter className="w-4 h-4" />
                        {showFilters ? 'Hide' : 'Show'} Filters
                    </button>
                    <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium hover:bg-green-200 transition-colors">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </div>

            {showFilters && (
                <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                            <input
                                type="text"
                                value={filters.category}
                                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                                placeholder="Search category..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                                value={filters.type}
                                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                value={filters.date}
                                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-gray-100">
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Type</th>
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Amount</th>
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Category</th>
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Description</th>
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Date</th>
                            <th className="text-left py-4 px-2 font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.map((transaction) => (
                            <tr key={transaction._id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                {editTransactionId === transaction._id ? (
                                    <>
                                        <td className="py-4 px-2">
                                            <select
                                                value={editedTransaction.type || ''}
                                                onChange={(e) => handleEditChange('type', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            >
                                                <option value="income">Income</option>
                                                <option value="expense">Expense</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="number"
                                                value={editedTransaction.amount || ''}
                                                onChange={(e) => handleEditChange( 'amount', e.target.value )}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="text"
                                                value={editedTransaction.category || ''}
                                                onChange={(e) => handleEditChange( "category", e.target.value )}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="text"
                                                value={editedTransaction.description || ''}
                                                onChange={(e) => handleEditChange( 'description', e.target.value )}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="date"
                                                value={editedTransaction.date?.split('T')[0] || ''}
                                                onChange={(e) => handleEditChange( 'date', e.target.value )}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={handleSaveTransaction}
                                                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                                                >
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <td className="py-4 px-2">
                                            <div className={`flex items-center gap-2 ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {transaction.type === 'income' ? (
                                                    <TrendingUp className="w-4 h-4" />
                                                ) : (
                                                    <TrendingDown className="w-4 h-4" />
                                                )}
                                                <span className="font-medium capitalize">{transaction.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                ₹{transaction.amount.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2">
                                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                                {transaction.category}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-gray-600">{transaction.description}</td>
                                        <td className="py-4 px-2 text-gray-600">
                                            {new Date(transaction.date).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditTransaction(transaction)}
                                                    className={`p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-red-200 transition-colors ${editTransactionId !== null ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                                        }`}
                                                    disabled={editTransactionId !== null}
                                                >
                                                    <Edit3 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTransaction(transaction._id)}
                                                    className={`p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors ${editTransactionId !== null ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'
                                                        }`}
                                                    disabled={editTransactionId !== null}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                            </div>
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
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mx-2 text-sm sm:text-base"
                            onClick={handleShowMore}
                        >
                            Show More
                        </button>
                    )}
                    {canShowLess && (
                        <button
                            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 mx-2 text-sm sm:text-base"
                            onClick={handleShowLess}
                        >
                            Show Less
                        </button>
                    )}
                </div>
            </div>

            {filteredTransactions.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-lg">No transactions found</p>
                    <p className="text-gray-400 text-sm">Try adjusting your filters or add a new transaction</p>
                </div>
            )}
        </div>
    );
};

export default TransactionList;