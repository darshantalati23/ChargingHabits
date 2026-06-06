import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LabelList,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

export default function WattageBar({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="Charger Wattage Distribution">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 16, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="wattage" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={v => [v + ' respondents', 'Count']} />
          <Bar dataKey="count" fill="var(--chart-2)" radius={[4, 4, 0, 0]} maxBarSize={64}>
            <LabelList dataKey="count" position="top" style={{ fill: 'var(--text-secondary)', fontSize: 11 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
