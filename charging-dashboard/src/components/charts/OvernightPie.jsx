import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from './shared';
import ChartCard from '../ChartCard';

const COLORS = { Yes: '#f43f5e', No: '#34d399' };
const RADIAN = Math.PI / 180;

const LABEL_FN = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.05) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function legendFormatter(value) {
  const labels = { Yes: 'Overnight charging', No: 'No overnight charging' };
  return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{labels[value] ?? value}</span>;
}

export default function OvernightPie({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="Overnight Charging">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="label"
            cx="50%"
            cy="45%"
            outerRadius={84}
            labelLine={false}
            label={LABEL_FN}
          >
            {data.map(entry => (
              <Cell key={entry.label} fill={COLORS[entry.label]} />
            ))}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v, name) => [v + ' respondents', name]} />
          <Legend formatter={legendFormatter} iconType="circle" iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
