import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getGraphData, downloadCSV } from "../api"; // Add a new API call for graph data
import { FaFileDownload } from "react-icons/fa";
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
import "../style/graph.css";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

export default function LineGraph({ transactions }) {
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
    <div className="chart-container position-relative">
      <button
        className="btn position-absolute top-0 end-0 m-10"
        onClick={downloadCSV}
      >
        <FaFileDownload className='fs-3' style={{ color: "green" }}/>
      </button>
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  );
};

