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

// DownloadCSV function to download transactions as CSV

export const downloadCSV = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/csv/download-csv", {
        responseType: "blob", // Important: Ensures the response is a binary file
      });
  
      // Create a downloadable blob
      const url = window.URL.createObjectURL(new Blob([response.data], { type: "text/csv" }));
      
      // Create a temporary link element to trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv"; // File name
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };
  

