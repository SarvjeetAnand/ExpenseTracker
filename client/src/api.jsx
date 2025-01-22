import axios from 'axios';

const API_URL = 'http://localhost:5000/api/transactions';

export const getTransactions = ({ page, limit }) =>
    axios.get(API_URL, { params: { page, limit } });
export const addTransaction = (transaction) => axios.post(API_URL, transaction);
export const deleteTransaction = (id) => axios.delete(`${API_URL}/${id}`);
export const getBudget = () => axios.get('http://localhost:5000/api/budget');
export const setBudget = (budget) => axios.post('http://localhost:5000/api/budget', { totalBudget: budget });
export const editTransaction = async (id, updatedTransaction) => {
    const response = await axios.put(`http://localhost:5000/api/transactions/${id}`, updatedTransaction);
    return response.data;
  };
  export const getGraphData = () => axios.get("http://localhost:5000/api/transactions/graph-data");

