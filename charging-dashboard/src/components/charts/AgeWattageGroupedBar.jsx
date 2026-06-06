import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const WATTAGE_CATS = ['<18W', '18-25W', '25-30W', '30-45W', '45-65W', '65W+'];
const WATTAGE_COLORS = {
  '<18W':   '#38bdf8',
  '18-25W': '#a78bfa',
  '25-30W': '#34d399',
  '30-45W': '#fb923c',
  '45-65W': '#f43f5e',
  '65W+':   '#fbbf24',
};

function legendFormatter(value) {
  return <span style={{ color: 'var(--text-secondary)', fontSize: 11 }}>{value}</span>;
}

export default function AgeWattageGroupedBar({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="Charger Wattage by Device Age">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 5 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="age" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={(v, name) => [v + ' respondents', name]} />
          <Legend formatter={legendFormatter} iconType="square" iconSize={10} wrapperStyle={{ paddingTop: 8 }} />
          {WATTAGE_CATS.map(cat => (
            <Bar key={cat} dataKey={cat} fill={WATTAGE_COLORS[cat]} radius={[2, 2, 0, 0]} maxBarSize={14} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
