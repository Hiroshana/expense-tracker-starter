import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

const formatCurrency = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 24, right: 8, left: 8, bottom: 0 }}
            title="Spending by category"
          >
            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              interval={0}
              tick={{ fill: "#555", fontSize: 13 }}
            />
            <YAxis
              tickFormatter={formatCurrency}
              tickLine={false}
              axisLine={false}
              width={60}
              tick={{ fill: "#555", fontSize: 12 }}
            />
            <Tooltip formatter={(value) => [formatCurrency(value), "Spent"]} cursor={{ fill: "#f5f5f5" }} />
            <Bar dataKey="amount" fill="#e05252" radius={[4, 4, 0, 0]} maxBarSize={48}>
              <LabelList dataKey="amount" position="top" formatter={formatCurrency} fill="#333" fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
