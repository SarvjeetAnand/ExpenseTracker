import React, { useState, useEffect } from 'react';
import { getTransactions, getBudget, deleteTransaction, editTransaction } from '../api';
import AddTransaction from './AddTransaction';
import TransactionList from './TransactionList';
import Budget from './Budget';
import LineChart from './LineChart';
import ConfirmationModal from "./ConfirmationModal";
import SuccessMessage from "./SuccessMessage";

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [budget, setBudget] = useState({ totalBudget: 0, currentBudget: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [displayedTransactions, setDisplayedTransactions] = useState([]);
    const [editTransactionId, setEditTransactionId] = useState(null); // Tracks the transaction being edited
    const [editedTransaction, setEditedTransaction] = useState({}); // Stores the edited transaction details
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [currentTransactionId, setCurrentTransactionId] = useState(null);
    const [actionType, setActionType] = useState(""); // 'delete' or 'save'

    // Fetch transactions from the backend
    const fetchTransactions = async (page) => {
        try {
            const response = await getTransactions({ page, limit: 10 }); // Fetch 10 items per page
            const fetchedTransactions = response.data.transactions;

            setTransactions((prev) => {
                const updatedTransactions = [...prev, ...fetchedTransactions];
                return updatedTransactions.filter(
                    (transaction, index, self) =>
                        index === self.findIndex((t) => t._id === transaction._id) // Avoid duplicates
                );
            });

            setTotalPages(response.data.totalPages);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    // Fetch the budget
    const fetchBudget = async () => {
        try {
            const { data } = await getBudget();
            setBudget(data);
        } catch (error) {
            console.error('Error fetching budget:', error);
        }
    };

    // Initialize transactions and budget on component mount
    useEffect(() => {
        fetchTransactions(1);
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
            fetchTransactions(nextPage);
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
            console.error("Error deleting transaction:", error);
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
            const updatedData = await editTransaction(editTransactionId, editedTransaction);
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
            console.error("Error saving transaction:", error);
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

    return (
        <div className="container my-4">
            {/* Budget Overview */}
            <Budget fetchBudget={fetchBudget} totalBudget={budget.totalBudget} currentBudget={budget.currentBudget} />

            {/* Add Transaction */}
            <AddTransaction fetchTransactions={fetchTransactions} setBudget={fetchBudget} />

            {/* Line Chart */}
            {isLoading ? <p>Loading...</p> : <LineChart transactions={transactions} />}

            {/* Transaction List with Edit and Pagination */}
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
        </div>
    );
};

