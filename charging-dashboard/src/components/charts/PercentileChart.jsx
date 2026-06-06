import {
  ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceArea, ReferenceLine, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

export default function PercentileChart({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="Plug-In Threshold Percentile Curve" style={{ minHeight: 'unset' }}>
      <ResponsiveContainer width="100%" height={190}>
        <ComposedChart data={data} margin={{ top: 8, right: 10, bottom: 24, left: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis
            dataKey="percentile" type="number" domain={[0, 100]}
            {...axisProps}
            label={{ value: 'Percentile', position: 'insideBottom', offset: -14, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <YAxis
            {...axisProps} domain={[0, 105]} unit="%"
            label={{ value: 'Threshold %', angle: -90, position: 'insideLeft', offset: 12, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <Tooltip {...tooltipStyle} formatter={v => [v + '%', 'Plug-in threshold']} labelFormatter={l => `Percentile: ${l}`} />
          <ReferenceArea x1={20} x2={80} fill="var(--accent-blue)" fillOpacity={0.06} />
          <ReferenceLine x={20} stroke="var(--accent-blue)" strokeDasharray="4 2" label={{ value: '20th', position: 'top', fill: 'var(--accent-violet)', fontSize: 9 }} />
          <ReferenceLine x={80} stroke="var(--accent-blue)" strokeDasharray="4 2" label={{ value: '80th', position: 'top', fill: 'var(--accent-violet)', fontSize: 9 }} />
          <Line dataKey="threshold_pct" stroke="var(--accent-blue)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--accent-blue)', strokeWidth: 0 }} activeDot={{ r: 5 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
