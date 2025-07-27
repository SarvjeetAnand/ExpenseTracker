import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getGraphData } from "../api";
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
import {
  BarChart3
} from 'lucide-react';

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
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px] p-3 sm:p-4 md:p-6 bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-800 flex items-center gap-2 sm:gap-3">
          <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-indigo-600" />
          <span className="hidden xs:inline sm:inline">Graph</span>
          <span className="xs:hidden sm:hidden">Chart</span>
        </h2>
      </div>

      {/* Chart Content */}
      <div className="relative h-[calc(100%-3rem)] sm:h-[calc(100%-4rem)] md:h-[calc(100%-5rem)]">
        {(() => {
          if (chartData === null || chartData.labels.length === 0) {
            return (
              <div className="text-center py-4 sm:py-6 md:py-8 lg:py-12 flex flex-col justify-center h-full">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
                  <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl mb-1 sm:mb-2 px-2 sm:px-4">
                  No transactions found
                </p>
                <p className="text-gray-400 text-xs sm:text-sm md:text-base px-4 sm:px-6 md:px-8 leading-relaxed">
                  Try to add a new transaction
                </p>
              </div>
            );
          } else {
            // Chart with data
            return (
              <div className="w-full h-full">
                <Line data={chartData} options={options} />
              </div>
            );
          }
        })()}
      </div>
    </div>
  );

};