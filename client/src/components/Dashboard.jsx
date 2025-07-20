import React, { useState, useEffect } from 'react';
import { getTransactions, getBudget, deleteTransaction, editTransaction } from '../api';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import Budget from './Budget';
import Header from './Header';
import LineGraph from './LineChart';
import ConfirmationModal from "./ConfirmationModal";
import SuccessMessage from "./SuccessMessage";
import ErrorModal from "./ui/ErrorModal";

// export default function Dashboard() {
// const [transactions, setTransactions] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);
// const [totalPages, setTotalPages] = useState(1);
// const [budget, setBudget] = useState({ totalBudget: 0, currentBudget: 0 });
// const [isLoading, setIsLoading] = useState(true);
// const [displayedTransactions, setDisplayedTransactions] = useState([]);
// const [editTransactionId, setEditTransactionId] = useState(null); // Tracks the transaction being edited
// const [editedTransaction, setEditedTransaction] = useState({}); // Stores the edited transaction details
// const [showConfirmation, setShowConfirmation] = useState(false);
// const [showSuccess, setShowSuccess] = useState(false);
// const [successMessage, setSuccessMessage] = useState("");
// const [currentTransactionId, setCurrentTransactionId] = useState(null);
// const [actionType, setActionType] = useState(""); // 'delete' or 'save'

// // Fetch transactions from the backend
// const fetchTransactions = async (page = 1, isAppending = false) => {
//     try {
//         const response = await getTransactions({ page, limit: 10 }); // Fetch 10 items per page
//         const fetchedTransactions = response.data.transactions;


//         if (isAppending) {
//             // Append only if we're loading more
//             setTransactions((prev) => {
//                 const updatedTransactions = [...prev, ...fetchedTransactions];
//                 return updatedTransactions.filter(
//                     (transaction, index, self) =>
//                         index === self.findIndex((t) => t._id === transaction._id)
//                 );
//             });
//         } else {
//             // Fresh fetch replaces all data
//             setTransactions(fetchedTransactions);
//         }

//         setTotalPages(response.data.totalPages);
//         setIsLoading(false);
//     } catch (error) {
//         console.error('Error fetching transactions:', error);
//     }
// };

// // Fetch the budget
// const fetchBudget = async () => {
//     try {
//         const { data } = await getBudget();
//         setBudget(data);
//     } catch (error) {
//         console.error('Error fetching budget:', error);
//     }
// };

// // Initialize transactions and budget on component mount
// useEffect(() => {
//     fetchTransactions(1, false); // Replace data on mount
//     fetchBudget();
// }, []);


// // Update displayed transactions when `transactions` or `currentPage` changes
// useEffect(() => {
//     const sliceIndex = currentPage * 10;
//     setDisplayedTransactions(transactions.slice(0, sliceIndex));
// }, [transactions, currentPage]);

// // Handle "Show More"
// const handleShowMore = () => {
//     if (currentPage < totalPages) {
//         const nextPage = currentPage + 1;
//         setCurrentPage(nextPage);
//         fetchTransactions(nextPage, true); // Append more
//     }
// };


// // Handle "Show Less"
// const handleShowLess = () => {
//     if (currentPage > 1) {
//         setCurrentPage((prev) => Math.max(prev - 1, 1));
//     }
// };

// // Handle transaction deletion
// const handleDeleteTransaction = async () => {
//     try {
//         await deleteTransaction(currentTransactionId);
//         setTransactions((prev) =>
//             prev.filter((transaction) => transaction._id !== currentTransactionId)
//         );
//         fetchBudget();
//         setShowConfirmation(false);
//         setSuccessMessage("Transaction deleted successfully!");
//         setShowSuccess(true);
//     } catch (error) {
//         console.error("Error deleting transaction:", error);
//     }
// };

// // Enable editing mode for a transaction
// const handleEditTransaction = (transaction) => {
//     setEditTransactionId(transaction._id);
//     setEditedTransaction({ ...transaction });
// };

// // Handle changes to the edited transaction
// const handleEditChange = (field, value) => {
//     setEditedTransaction((prev) => ({
//         ...prev,
//         [field]: value,
//     }));
// };

// // Save the edited transaction
// const handleSaveTransaction = async () => {
//     try {
//         const updatedData = await editTransaction(editTransactionId, editedTransaction);
//         setTransactions((prev) =>
//             prev.map((transaction) =>
//                 transaction._id === editTransactionId ? updatedData.updatedTransaction : transaction
//             )
//         );
//         setBudget((prev) => ({ ...prev, currentBudget: updatedData.currentBudget }));
//         setEditTransactionId(null); // Exit edit mode
//         setShowConfirmation(false);
//         setSuccessMessage("Transaction saved successfully!");
//         setShowSuccess(true);
//     } catch (error) {
//         console.error("Error saving transaction:", error);
//     }
// };


// // Cancel editing
// const handleCancelEdit = () => {
//     setEditTransactionId(null);
//     setEditedTransaction({});
// };


// const handleActionConfirm = () => {
//     if (actionType === "delete") {
//         handleDeleteTransaction();
//     } else if (actionType === "save") {
//         handleSaveTransaction();
//     }
// };

// const openConfirmationModal = (id, type) => {
//     setCurrentTransactionId(id);
//     setActionType(type);
//     setShowConfirmation(true);
// };

//     return (
//         <div className="container my-4">
//             {/* Budget Overview */}
// <Budget fetchBudget={fetchBudget} totalBudget={budget.totalBudget} currentBudget={budget.currentBudget} />

//             {/* Add Transaction */}
// <AddTransaction fetchTransactions={fetchTransactions} setBudget={fetchBudget} />

// {/* Line Chart */}
// {isLoading ? <p>Loading...</p> : <LineChart transactions={transactions} />}

// {/* Transaction List with Edit and Pagination */}
// <TransactionList
//     transactions={displayedTransactions}
//     fetchTransactions={fetchTransactions}
//     handleDeleteTransaction={(id) => openConfirmationModal(id, "delete")}
//     setBudget={fetchBudget}
//     handleEditTransaction={handleEditTransaction}
//     editTransactionId={editTransactionId}
//     editedTransaction={editedTransaction}
//     handleEditChange={handleEditChange}
//     handleSaveTransaction={(id) => openConfirmationModal(id, "save")}
//     handleCancelEdit={handleCancelEdit}
//     handleShowMore={handleShowMore}
//     hasMore={currentPage < totalPages}
//     handleShowLess={handleShowLess}
//     canShowLess={currentPage > 1}
// />
// {/* Confirmation Modal */}
// <ConfirmationModal
//     show={showConfirmation}
//     title="Are you sure?"
//     message={
//         actionType === "delete"
//             ? "Are you sure you want to delete this transaction?"
//             : "Are you sure you want to save this transaction?"
//     }
//     onConfirm={handleActionConfirm}
//     onCancel={() => setShowConfirmation(false)}
//     confirmLabel={actionType === "delete" ? "Delete" : "Save"}
//     confirmVariant={actionType === "delete" ? "danger" : "primary"}
// />

// {/* Success Message */}
// <SuccessMessage
//     show={showSuccess}
//     message={successMessage}
//     onClose={() => setShowSuccess(false)}
// />
//         </div>
//     );
// };


import {
    Wallet,

} from 'lucide-react';



const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [budget, setBudget] = useState({ totalBudget: 0, currentBudget: 0 });
    const [loading, setLoading] = useState(true);
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    const [editTransactionId, setEditTransactionId] = useState(null); // Tracks the transaction being edited
    const [editedTransaction, setEditedTransaction] = useState({}); // Stores the edited transaction details
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentTransactionId, setCurrentTransactionId] = useState(null);
    const [actionType, setActionType] = useState(""); // 'delete' or 'save'
    const [errorModal, setErrorModal] = useState({ show: false, message: "Something went wrong while fetching data." });


    // Fetch transactions
    const fetchTransactions = async (page = 1, isAppending = false) => {
        try {
            const response = await getTransactions({ page, limit: 10 }); // Fetch 10 items per page
            const fetchedTransactions = response.data.transactions;


            if (isAppending) {
                // Append only if we're loading more
                setTransactions((prev) => {
                    const updatedTransactions = [...prev, ...fetchedTransactions];
                    return updatedTransactions.filter(
                        (transaction, index, self) =>
                            index === self.findIndex((t) => t._id === transaction._id)
                    );
                });
            } else {
                // Fresh fetch replaces all data
                setTransactions(fetchedTransactions);
            }

            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error) {
            setErrorModal({
                show: true,
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch transactions. Please try again.",
            });
        }
    };

    // Fetch the budget
    const fetchBudget = async () => {
        try {
            const { data } = await getBudget();
            setBudget(data);
        } catch (error) {
            setErrorModal({
                show: true,
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch transactions. Please try again.",
            });
        }
    };

    // Initialize transactions and budget on component mount
    useEffect(() => {
        fetchTransactions(1, false); // Replace data on mount
        fetchBudget();
    }, []);


    // Update displayed transactions when `transactions` or `currentPage` changes
    useEffect(() => {
        const sliceIndex = currentPage * 10;
        setDisplayedTransactions(transactions.slice(0, sliceIndex));
    }, [transactions, currentPage]);

    // Handle "Show More"
    const handleShowMore = () => {
        if (currentPage < totalPages) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchTransactions(nextPage, true); // Append more
        }
    };


    // Handle "Show Less"
    const handleShowLess = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => Math.max(prev - 1, 1));
        }
    };

    // Handle transaction deletion
    const handleDeleteTransaction = async () => {
        try {
            await deleteTransaction(currentTransactionId);
            setTransactions((prev) =>
                prev.filter((transaction) => transaction._id !== currentTransactionId)
            );
            fetchBudget();
            setShowConfirmation(false);
            setSuccessMessage("Transaction deleted successfully!");
            setShowSuccess(true);
        } catch (error) {
            setErrorModal({
                show: true,
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch transactions. Please try again.",
            });
        }
    };

    // Enable editing mode for a transaction
    const handleEditTransaction = (transaction) => {
        setEditTransactionId(transaction._id);
        setEditedTransaction({ ...transaction });
    };

    // Handle changes to the edited transaction
    const handleEditChange = (field, value) => {
        setEditedTransaction((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Save the edited transaction
    const handleSaveTransaction = async () => {
        try {
            const updatedData = await editTransaction( editedTransaction);
            setTransactions((prev) =>
                prev.map((transaction) =>
                    transaction._id === editTransactionId ? updatedData.updatedTransaction : transaction
                )
            );
            setBudget((prev) => ({ ...prev, currentBudget: updatedData.currentBudget }));
            setEditTransactionId(null); // Exit edit mode
            setShowConfirmation(false);
            setSuccessMessage("Transaction saved successfully!");
            setShowSuccess(true);
        } catch (error) {
            setErrorModal({
                show: true,
                message:
                    error?.response?.data?.message ||
                    "Failed to fetch transactions. Please try again.",
            });
        }
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setEditTransactionId(null);
        setEditedTransaction({});
    };


    const handleActionConfirm = () => {
        if (actionType === "delete") {
            handleDeleteTransaction();
        } else if (actionType === "save") {
            handleSaveTransaction();
        }
    };

    const openConfirmationModal = (id, type) => {
        setCurrentTransactionId(id);
        setActionType(type);
        setShowConfirmation(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                        <Wallet className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-600 text-lg">Loading your budget...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
            {/* Header */}
            <header className="w-full">
                <Header />
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
                <div className="w-full max-w-full mx-auto space-y-4 break-words">

                    {/* Budget */}
                    <div className="w-full">
                        <Budget fetchBudget={fetchBudget} totalBudget={budget.totalBudget} currentBudget={budget.currentBudget} />

                    </div>

                    {/* Add Transaction */}
                    <div className="w-full">
                        <AddTransaction fetchTransactions={fetchTransactions} setBudget={fetchBudget} />                    </div>

                    {/* Line Chart */}
                    {loading ? <p>Loading...</p> : <LineGraph transactions={transactions} />}

                    {/* Transaction List */}
                    <div className="w-full">
                        <TransactionList
                            transactions={displayedTransactions}
                            fetchTransactions={fetchTransactions}
                            handleDeleteTransaction={(id) => openConfirmationModal(id, "delete")}
                            setBudget={fetchBudget}
                            handleEditTransaction={handleEditTransaction}
                            editTransactionId={editTransactionId}
                            editedTransaction={editedTransaction}
                            handleEditChange={handleEditChange}
                            handleSaveTransaction={(id) => openConfirmationModal(id, "save")}
                            handleCancelEdit={handleCancelEdit}
                            handleShowMore={handleShowMore}
                            hasMore={currentPage < totalPages}
                            handleShowLess={handleShowLess}
                            canShowLess={currentPage > 1}
                        />
                        {/* Confirmation Modal */}
                        <ConfirmationModal
                            show={showConfirmation}
                            title="Are you sure?"
                            message={
                                actionType === "delete"
                                    ? "Are you sure you want to delete this transaction?"
                                    : "Are you sure you want to save this transaction?"
                            }
                            onConfirm={handleActionConfirm}
                            onCancel={() => setShowConfirmation(false)}
                            confirmLabel={actionType === "delete" ? "Delete" : "Save"}
                            confirmVariant={actionType === "delete" ? "danger" : "primary"}
                        />

                        {/* Success Message */}
                        <SuccessMessage
                            show={showSuccess}
                            message={successMessage}
                            onClose={() => setShowSuccess(false)}
                        />

                        <ErrorModal
                            show={errorModal.show}
                            message={errorModal.message}
                            onClose={() => setErrorModal({ show: false, message: "" })}
                        />

                    </div>
                </div>
            </main>
        </div>
    );


};

export default Dashboard;