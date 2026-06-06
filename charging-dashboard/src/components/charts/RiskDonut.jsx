import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from './shared';
import ChartCard from '../ChartCard';

const COLORS = { high: '#f43f5e', medium: '#fb923c', low: '#34d399' };
const RADIAN = Math.PI / 180;

const LABEL_FN = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={600}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

function legendFormatter(value) {
  return (
    <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </span>
  );
}

export default function RiskDonut({ data }) {
  if (!data) return null;
  const chartData = data.map(({ category, count }) => ({ category, count }));
  return (
    <ChartCard title="User Risk Distribution">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="45%"
            innerRadius={52}
            outerRadius={84}
            labelLine={false}
            label={LABEL_FN}
          >
            {chartData.map(entry => (
              <Cell key={entry.category} fill={COLORS[entry.category]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v, name) => [v + ' respondents', name]} />
          <Legend formatter={legendFormatter} iconType="circle" iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
