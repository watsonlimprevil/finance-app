import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

export default function MonthlyTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: "Income",
        data: data.map(d => d.income),
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.2)"
      },
      {
        label: "Expenses",
        data: data.map(d => d.expenses),
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.2)"
      },
      {
        label: "Net",
        data: data.map(d => d.net),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.2)"
      }
    ]
  };

  return (
    <div className='chart-container' >
      <h3>Monthly Trends</h3>
      <Line data={chartData} />
    </div>
  );
}
