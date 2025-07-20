import React, { useState } from 'react';
import {
  IndianRupee,
  Target,
  Wallet,
} from 'lucide-react';
import { setBudget } from '../api';

// export default function Budget({fetchBudget,totalBudget,currentBudget}) {
//     const [budget, setBudgetState] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await setBudget(budget);
//         fetchBudget();
//         setBudgetState('');
//     };

//     return (
//         <div className="mb-4 text-center">
//             <h4>Set Budget</h4>
//             <p>Total Set Budget: ₹{totalBudget || 'Not Set'}</p>
//             <p>Current Budget: ₹{currentBudget || 'Not Set'}</p>
//             <form onSubmit={handleSubmit}>
//                 <div className='row justify-content-center'>
//                     <div className="col-md-3 col-6">
//                     <input
//                     type="number"
//                     required
//                     placeholder="Enter budget"
//                     value={budget}
//                     onChange={(e) => setBudgetState(e.target.value)}
//                     className="form-control mb-2"
//                 />

//                     </div>
//                 </div>

//                 <button type="submit" className="btn btn-success">Set Budget</button>
//             </form>
//         </div>
//     );
// };

const Budget = ({ fetchBudget, totalBudget, currentBudget }) => {
  const [budget, setBudgetState] = useState('');
  const [isSettingBudget, setIsSettingBudget] = useState(false);

  // const budgetPercentage = totalBudget > 0 ? (currentBudget / totalBudget) * 100 : 0;

  const isOverBudget = currentBudget > totalBudget;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await setBudget(budget);
    fetchBudget();
    setBudgetState('');
  };
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4 sm:gap-0">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <Target className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-blue-600" />
          Budget Overview
        </h2>
        <button
          onClick={() => setIsSettingBudget(!isSettingBudget)}
          className="sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg text-sm sm:text-base"
        >
          {isSettingBudget ? 'Cancel' : 'Set Budget'}
        </button>
      </div>

      {/* Budget Setting Form */}
      {isSettingBudget && (
        <form onSubmit={handleSubmit} className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudgetState(e.target.value)}
              placeholder="Enter budget amount"
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-green-600 transition-colors text-sm sm:text-base"
            >
              Set Budget
            </button>
          </div>
        </form>
      )}

      {/* Budget Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Total Budget Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">Total Budget</h3>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 break-all">
            ₹{totalBudget?.toLocaleString() || 'Not Set'}
          </p>
        </div>

        {/* Current Budget Card */}
        <div className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 border ${isOverBudget
            ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-100'
            : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-100'
          }`}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-700">Current Budget</h3>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${isOverBudget ? 'bg-red-100' : 'bg-green-100'
              }`}>
              <Wallet className={`w-4 h-4 sm:w-5 sm:h-5 ${isOverBudget ? 'text-red-600' : 'text-green-600'
                }`} />
            </div>
          </div>
          <p className={`text-xl sm:text-2xl md:text-3xl font-bold break-all ${isOverBudget ? 'text-red-600' : 'text-green-600'
            }`}>
            ₹{currentBudget?.toLocaleString() || 'Not Set'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Budget;