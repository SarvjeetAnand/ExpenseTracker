import { useState } from 'react';
import { addTransaction } from '../api';
import CategorySelector from '../components/ui/CategorySelector';
// export default function AddTransaction({ fetchTransactions, setBudget }) {
//     const [formData, setFormData] = useState({
//         type: 'expense',
//         amount: '',
//         category: '',
//         description: '',
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await addTransaction(formData);
//         fetchTransactions(); // Update transactions
//         setFormData({ type: 'expense', amount: '', category: '', description: '', date: '' });
//         setBudget();
//     };

//     return (
//         <form onSubmit={handleSubmit} className="container mb-4">
//             <div className="row g-2">
//                 <div className="col-lg-2 col-md-6 gap-3">
//                     <div className="row justify-content-center">
//                         <div className="col-md-6 col-3 form-check">
//                             <input
//                                 className="form-check-input"
//                                 required
//                                 type="radio"
//                                 name="type"
//                                 id="income"
//                                 value="income"
//                                 checked={formData.type === 'income'}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label" htmlFor="income">Income</label>
//                         </div>
//                         <div className="form-check col-md-6 col-3">
//                             <input
//                                 className="form-check-input"
//                                 required
//                                 type="radio"
//                                 name="type"
//                                 id="expense"
//                                 value="expense"
//                                 checked={formData.type === 'expense'}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label" htmlFor="expense">Expense</label>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-lg-2 col-md-6 col-6">
//                     <input required type="number" name="amount" onChange={handleChange} value={formData.amount} placeholder="Amount" className="form-control" />
//                 </div>
//                 <div className="col-lg-2 col-md-4 col-6">
//                     <input required type="text" name="category" onChange={handleChange} value={formData.category} placeholder="Category" className="form-control" />
//                 </div>
//                 <div className="col-lg-2 col-md-4 col-6">
//                     <input
//                         required
//                         type="text"
//                         name="description"
//                         placeholder="Description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className='col-lg-2 col-md-4 col-6'>
//                     <input
//                         type="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         className="form-control"
//                     />
//                 </div>
//                 <div className="col-lg-2 col-md-12 col-12 text-center">
//                     <button type="submit" className="btn btn-primary ws-100 ws-md ws-sm">Add</button>
//                 </div>
//             </div>
//         </form>
//     );
// };

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


    const handleSubmit = async (e) => {
        e.preventDefault();
        await addTransaction(formData);
        fetchTransactions(); // Update transactions
        setFormData({ type: 'expense', amount: '', category: '', description: '', date: '' });
        setBudget();
    };

  return (
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
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="sr-only"
                />
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  formData.type === 'income' 
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
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="sr-only"
                />
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all ${
                  formData.type === 'expense' 
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
              <IndianRupee  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
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
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brief description"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
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
  );
};

export default AddTransaction;