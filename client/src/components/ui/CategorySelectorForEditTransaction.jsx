import { useState, useRef, useEffect } from 'react';
import ConfirmationModal from '../ConfirmationModal';
import SuccessMessage from '../SuccessMessage';
import ErrorModal from './ErrorModal';

const CategorySelectorForEditTransaction = ({ formData, setFormData }) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  const categories = [
    { value: 'salary', label: 'Salary' },
    { value: 'market', label: 'Market' },
    { value: 'friend', label: 'Friend' },
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'travel', label: 'Travel' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'investment', label: 'Investment' },
    { value: 'rent', label: 'Rent' },
    { value: 'loan', label: 'Loan' },
    { value: 'gift', label: 'Gift' },
    { value: 'charity', label: 'Charity' },
    { value: 'pets', label: 'Pets' },
    { value: 'hobbies', label: 'Hobbies' },
    { value: 'other', label: 'Other' }
  ];

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchTerm('');
  };

  const handleCategorySelect = (value) => {
    setFormData({ ...formData, category: value });
    setIsDropdownOpen(false);
    setSearchTerm('');

    if (value === 'other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  };


  const handleSaveCustomCategory = async () => {
    if (!customCategory.trim()) {
      setErrorMessage('Please fill in your custom category');
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
      if (customCategory.trim() !== '') {
        setFormData({ ...formData, category: customCategory.trim() });
        setShowCustomInput(false);
        setCustomCategory('');
      }

      // Show success message
      setSuccessMessage(`Other category set successfully!`);
      setShowSuccess(true);

    } catch (error) {
      // Show error message
      setErrorMessage('Failed to add transaction. Please try again.');
      setShowError(true);
    }
  };


  // Create confirmation message
  const getConfirmationMessage = () => {
    return `Are you sure you want to add a other category of ${customCategory.trim()}?`;
  };


  const getDisplayValue = () => {
    if (formData.category) {
      const category = categories.find(cat => cat.value === formData.category);
      return category ? category.label : formData.category;
    }
    return 'Select Category';
  };

  return (
    <>
      <div>
        {/* Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={handleDropdownToggle}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex justify-between items-center"
          >
            <span className={formData.category ? 'text-gray-900' : 'text-gray-500'}>
              {getDisplayValue()}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg">
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Scrollable Options */}
              <div className="max-h-60 overflow-y-auto">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => handleCategorySelect(category.value)}
                      className={`w-full px-4 py-3 text-left hover:bg-blue-50 focus:bg-blue-50 focus:outline-none transition-colors ${formData.category === category.value ? 'bg-blue-100 text-blue-700' : 'text-gray-900'
                        }`}
                    >
                      {category.label}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-center">
                    No categories found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Custom Category Input */}
        {showCustomInput && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter custom category"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSaveCustomCategory();
                }
              }}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => { handleSaveCustomCategory(); }}
                className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCustomInput(false);
                  setCustomCategory('');
                  setFormData({ ...formData, category: '' });
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
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
}

export default CategorySelectorForEditTransaction;