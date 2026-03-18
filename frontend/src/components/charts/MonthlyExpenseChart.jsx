import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MonthlyExpenseChart = ({ expenses }) => {
  // 1️⃣ Group expenses by year-month
  const monthlyData = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.date);

    const year = date.getFullYear();
    const month = date.getMonth(); // 0-based

    const key = `${year}-${month}`;
    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[key]) {
      monthlyData[key] = {
        year,
        month,
        label,
        total: 0,
      };
    }

    monthlyData[key].total += Number(exp.amount);
  });

  // 2️⃣ Proper sorting (latest month first)
  const sortedKeys = Object.keys(monthlyData).sort((a, b) => {
    const [yearA, monthA] = a.split("-").map(Number);
    const [yearB, monthB] = b.split("-").map(Number);

    if (yearA === yearB) return monthB - monthA;
    return yearB - yearA;
  });

  // 3️⃣ Prepare chart data
  const labels = sortedKeys.map((key) => monthlyData[key].label);
  const dataValues = sortedKeys.map((key) => monthlyData[key].total);

  const data = {
    labels,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: dataValues,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  // 4️⃣ Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        ticks: {
          callback: (value) => `₹${value}`,
        },
      },
    },
  };

  return (
    <div className="card bg-base-200 p-4 h-75">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Monthly Expenses
      </h2>

      <div className="h-60">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyExpenseChart;
