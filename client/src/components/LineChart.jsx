// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from "chart.js";
// import { getTransactions } from "../api";
// import "./style/graph.css";
// ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

// const LineChart = () => {
//   const [chartData, setChartData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getTransactions();
//         const data = response.data;

//         // Process data into chart format
//         const groupedData = data.reduce(
//           (acc, transaction) => {
//             const month = new Date(transaction.date).toLocaleString("default", { month: "long" });
//             if (!acc.labels.includes(month)) {
//               acc.labels.push(month);
//             }

//             const index = acc.labels.indexOf(month);
//             if (transaction.type === "income") {
//               acc.income[index] = (acc.income[index] || 0) + transaction.amount;
//             } else if (transaction.type === "expense") {
//               acc.expenses[index] = (acc.expenses[index] || 0) + transaction.amount;
//             }

//             return acc;
//           },
//           { labels: [], income: [], expenses: [] }
//         );

//         // Populate chartData
//         setChartData({
//           labels: groupedData.labels,
//           datasets: [
//             {
//               label: "Expenses",
//               data: groupedData.expenses,
//               borderColor: "#ff0000",
//               backgroundColor: "rgba(0, 123, 255, 0.3)",
//               tension: 0.4,
//               pointRadius: 5,
//               pointBackgroundColor: "#ff0000",
//             },
//             {
//               label: "Income",
//               data: groupedData.income,
//               borderColor: "#28a745",
//               backgroundColor: "rgba(40, 167, 69, 0.3)",
//               tension: 0.4,
//               pointRadius: 5,
//               pointBackgroundColor: "#28a745",
//             },
//           ],
//         });

//         setIsLoading(false);
//       } catch (error) {
//         console.error("Error fetching transaction data:", error);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           font: {
//             size: 14,
//           },
//         },
//       },
//       tooltip: {
//         callbacks: {
//           label: function (context) {
//             return `${context.dataset.label}: ₹${context.raw}`;
//           },
//         },
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Months",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Amount (₹)",
//         },
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       {isLoading ? (
//         <p>Loading chart data...</p>
//       ) : (
//         <Line data={chartData} options={options} />
//       )}
//     </div>
//   );
// };

// export default LineChart;



// import React, { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   LineElement,
//   PointElement,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   CategoryScale,
// } from "chart.js";
// import "./style/graph.css";

// ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

// const LineChart = ({ transactions }) => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     // Process transactions dynamically whenever the prop updates
//     const groupedData = transactions
//       .slice() // Create a shallow copy of transactions to avoid mutating the original array
//       .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort transactions by date in ascending order
//       .reduce(
//         (acc, transaction) => {
//           const date = new Date(transaction.date);
//           const monthWithYear = date.toLocaleString("default", { month: "long" }) + ` ${date.getFullYear()}`;
//           if (!acc.labels.includes(monthWithYear)) {
//             acc.labels.push(monthWithYear);
//           }

//           const index = acc.labels.indexOf(monthWithYear);
//           if (transaction.type === "income") {
//             acc.income[index] = (acc.income[index] || 0) + transaction.amount;
//           } else if (transaction.type === "expense") {
//             acc.expenses[index] = (acc.expenses[index] || 0) + transaction.amount;
//           }

//           return acc;
//         },
//         { labels: [], income: [], expenses: [] }
//       );

//     setChartData({
//       labels: groupedData.labels,
//       datasets: [
//         {
//           label: "Expenses",
//           data: groupedData.expenses,
//           borderColor: "#ff0000",
//           backgroundColor: "rgba(255, 0, 0, 0.3)",
//           tension: 0.4,
//           pointRadius: 5,
//           pointBackgroundColor: "#ff0000",
//         },
//         {
//           label: "Income",
//           data: groupedData.income,
//           borderColor: "#28a745",
//           backgroundColor: "rgba(40, 167, 69, 0.3)",
//           tension: 0.4,
//           pointRadius: 5,
//           pointBackgroundColor: "#28a745",
//         },
//       ],
//     });
//   }, [transactions]);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: "top" },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.dataset.label}: ₹${context.raw}`,
//         },
//       },
//     },
//     scales: {
//       x: { title: { display: true, text: "Months" } },
//       y: { title: { display: true, text: "Amount (₹)" }, beginAtZero: true },
//     },
//   };

//   return (
//     <div className="chart-container">
//       {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
//     </div>
//   );
// };

// export default LineChart;

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getGraphData } from "../api"; // Add a new API call for graph data
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import "./style/graph.css";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineGraph = ({ transactions }) => {
  const [chartData, setChartData] = useState(null);

  const fetchGraphData = async () => {
    try {
      const response = await getGraphData(); // Fetch data from the API endpoint
      const data = response.data;
      const labels = data.map((item) => item.monthYear);
      const incomeData = data.map((item) => item.income);
      const expenseData = data.map((item) => item.expense);

      setChartData({
        labels,
        datasets: [
          {
            label: "Expenses",
            data: expenseData,
            borderColor: "#ff0000",
            backgroundColor: "rgba(255, 0, 0, 0.3)",
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#ff0000",
          },
          {
            label: "Income",
            data: incomeData,
            borderColor: "#28a745",
            backgroundColor: "rgba(40, 167, 69, 0.3)",
            tension: 0.4,
            pointRadius: 5,
            pointBackgroundColor: "#28a745",
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching graph data:", error);
    }
  };

  // Fetch graph data on component mount or when transactions update
  useEffect(() => {
    fetchGraphData();
  }, [transactions]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ₹${context.raw}`,
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Months" } },
      y: { title: { display: true, text: "Amount (₹)" }, beginAtZero: true },
    },
  };

  return (
    <div className="chart-container">
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

export default LineGraph;
