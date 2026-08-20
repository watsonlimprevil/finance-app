import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function CategoryPieChart({ data = [] }) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <PieChart width={350} height={350}>
      <Pie
        data={data}
        dataKey="total"
        nameKey="category"
        cx={175}
        cy={175}
        outerRadius={120}
        label
      >
        {data.map((entry, i) => (
          <Cell key={i} fill={COLORS[i % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}
