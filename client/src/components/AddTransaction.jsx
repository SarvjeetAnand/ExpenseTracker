import { useState } from 'react';
import { addTransaction } from '../api';
import CategorySelector from '../components/ui/CategorySelector';
import ConfirmationModal from '../components/ConfirmationModal';
import SuccessMessage from '../components/SuccessMessage';
import ErrorModal from '../components/ui/ErrorModal';
import {
  PlusCircle,
  TrendingUp,
  TrendingDown,
  IndianRupee,
} from 'lucide-react';


const AddTransaction = ({ fetchTransactions, setBudget }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.amount || !formData.category || !formData.description) {
      setErrorMessage('Please fill in all required fields');
      setShowError(true);
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  // Handle confirmed save
  const handleConfirmSave = async () => {
    setShowConfirmation(false);

    try {
      await addTransaction(formData);

      // Update data
      fetchTransactions();
      setBudget();

      // Reset form
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });

      // Show success message
      setSuccessMessage(`${formData.type === 'income' ? 'Income' : 'Expense'} of ₹${formData.amount} added successfully!`);
      setShowSuccess(true);

    } catch (error) {
      // Show error message
      setErrorMessage('Failed to add transaction. Please try again.');
      setShowError(true);
    }
  };

  
  // Create confirmation message
  const getConfirmationMessage = () => {
    const typeText = formData.type === 'income' ? 'income' : 'expense';
    return `Are you sure you want to add this ${typeText} of ₹${formData.amount} for "${formData.description}" in ${formData.category} category?`;
  };




  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <PlusCircle className="w-7 h-7 text-green-600" />
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Transaction Type</label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="income"
                    checked={formData.type === 'income'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${formData.type === 'income'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-green-300'
                    }`}>
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-medium">Income</span>
                  </div>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="expense"
                    checked={formData.type === 'expense'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${formData.type === 'expense'
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-red-300'
                    }`}>
                    <TrendingDown className="w-5 h-5" />
                    <span className="font-medium">Expense</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Amount</label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CategorySelector formData={formData} setFormData={setFormData} />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Transaction
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showConfirmation}
        title="Confirm Transaction"
        message={getConfirmationMessage()}
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirmation(false)}
        confirmLabel="Save Transaction"
        confirmVariant="primary"
      />

      {/* Success Message */}
      <SuccessMessage
        show={showSuccess}
        message={successMessage}
        onClose={() => setShowSuccess(false)}
      />

      {/* Error Message */}
      <ErrorModal
        show={showError}
        message={errorMessage}
        onClose={() => setShowError(false)}
      />

    </>

  );
};

export default AddTransaction;