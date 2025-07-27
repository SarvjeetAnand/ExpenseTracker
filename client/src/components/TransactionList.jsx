import { React, useState } from 'react';
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

import CategorySelectorForEditTransaction from './ui/CategorySelectorForEditTransaction';
import { downloadCSV } from '../api';

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
        const matchesDate =
            !filters.date ||
            new Date(transaction.date).toLocaleDateString() ===
            new Date(filters.date).toLocaleDateString();
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
                    <button className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full font-medium hover:bg-green-200 transition-colors"
                        onClick={() => downloadCSV(filteredTransactions)}
                    >
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
                                                type="text"
                                                value={editedTransaction.amount || ''}
                                                onChange={(e) => handleEditChange('amount', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            {/* <input
                                                type="text"
                                                value={editedTransaction.category?.charAt(0).toUpperCase() + editedTransaction.category?.slice(1) || ''}
                                                onChange={(e) => handleEditChange("category", e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            /> */}

                                            <CategorySelectorForEditTransaction
                                                formData={{ category: editedTransaction.category }}
                                                setFormData={(data) => handleEditChange('category', data.category)}
                                            />


                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="text"
                                                value={editedTransaction.description.charAt(0).toUpperCase() + editedTransaction.description.slice(1) || ''}
                                                onChange={(e) => handleEditChange('description', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                            />
                                        </td>
                                        <td className="py-4 px-2">
                                            <input
                                                type="date"
                                                value={editedTransaction.date?.split('T')[0] || ''}
                                                onChange={(e) => handleEditChange('date', e.target.value)}
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
                                                {transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-gray-600">{transaction.description.charAt(0).toUpperCase() + transaction.description.slice(1)}</td>
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