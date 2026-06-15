import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { tooltipStyle } from './shared';
import ChartCard from '../ChartCard';

const COLORS = ['#10b981', '#f97316'];
const RADIAN = Math.PI / 180;

const LABEL_FN = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
};

function legendFormatter(value) {
  return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>;
}

export default function RuleAdoptionPie({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="20–80% Rule Adoption" style={{ minHeight: 'unset' }}>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie data={data} dataKey="count" nameKey="label" cx="50%" cy="45%" outerRadius={70} labelLine={false} label={LABEL_FN}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip {...tooltipStyle} formatter={(v, n) => [v + ' respondents', n]} />
          <Legend formatter={legendFormatter} iconType="circle" iconSize={8} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
