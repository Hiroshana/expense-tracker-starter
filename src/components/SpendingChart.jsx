import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';
import { capitalize, formatMoney } from '../format';

const INK_MUTED = "#5D6683";
const LINE = "#DCE1EB";
const EXPENSE = "#B3323E";

function SpendingChart({ transactions }) {
  const totals = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category: capitalize(category), amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <section className="spending-chart" aria-labelledby="chart-title">
      <h2 id="chart-title">Spending by category</h2>
      {data.length === 0 ? (
        <p className="empty">Nothing spent yet. Expenses you add will show up here.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 24, right: 0, left: 0, bottom: 0 }}
            title="Spending by category"
          >
            <CartesianGrid vertical={false} stroke={LINE} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={{ stroke: LINE }}
              interval={0}
              tick={{ fill: INK_MUTED, fontSize: 12 }}
            />
            <YAxis
              tickFormatter={formatMoney}
              tickLine={false}
              axisLine={false}
              width={56}
              tick={{ fill: INK_MUTED, fontSize: 12 }}
            />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Spent"]}
              cursor={{ fill: "rgba(28, 37, 65, 0.05)" }}
              contentStyle={{ borderRadius: 8, border: `1px solid ${LINE}`, fontSize: 13 }}
            />
            <Bar dataKey="amount" fill={EXPENSE} radius={[3, 3, 0, 0]} maxBarSize={44}>
              <LabelList dataKey="amount" position="top" formatter={formatMoney} fill="#1C2541" fontSize={12} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default SpendingChart
