import { useState } from 'react';

const CategorySelector = ({ formData, setFormData }) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customCategory, setCustomCategory] = useState('');

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, category: value });

    if (value === 'other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
    }
  };

  const handleSaveCustomCategory = () => {
    if (customCategory.trim() !== '') {
      setFormData({ ...formData, category: customCategory.trim() });
      setShowCustomInput(false);
      setCustomCategory('');      
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
      <select
        value={formData.category}
        onChange={handleCategoryChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        required
      >
        <option value="">Select Category</option>
        <option value="salary">Salary</option>
        <option value="market">Market</option>
        <option value="friend">Friend</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="entertainment">Entertainment</option>
        <option value="utilities">Utilities</option>
        <option value="healthcare">Healthcare</option>
        <option value="other">Other</option>
      </select>

      {showCustomInput && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleSaveCustomCategory}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
