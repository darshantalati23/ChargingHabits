import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const FREQ_LABEL = { '0.5': '½× / day', '1.0': '1× / day', '2.0': '2× / day' };

export default function FrequencyBar({ data }) {
  if (!data) return null;
  const formatted = data.map(d => ({
    label: FREQ_LABEL[d.times_per_day] ?? `${d.times_per_day}×/day`,
    count: d.count,
  }));
  return (
    <ChartCard title="Daily Charging Frequency">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={formatted} margin={{ top: 16, right: 16, left: -10, bottom: 5 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={(v) => [v + ' respondents', 'Count']} />
          <Bar dataKey="count" fill="var(--chart-3)" radius={[4, 4, 0, 0]} maxBarSize={80}>
            <LabelList dataKey="count" position="top" style={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
