import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, LabelList,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

function legendFormatter(value) {
  return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>;
}

function PctLabel({ x, y, width, index, data }) {
  const pct = data[index]?.overnight_pct;
  if (pct == null) return null;
  return (
    <text x={x + width / 2} y={y - 5} textAnchor="middle" fill="var(--text-secondary)" fontSize={11} fontWeight={600}>
      {pct}%
    </text>
  );
}

export default function OvernightByAgeBar({ data, chiP, significant }) {
  if (!data) return null;

  const totalON  = data.reduce((s, r) => s + r.overnight_yes, 0);
  const totalAll = data.reduce((s, r) => s + r.overnight_yes + r.overnight_no, 0);

  return (
    <ChartCard title="Overnight Charging by Device Age">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 24, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="age" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={(v, name) => [v + ' respondents', name]} />
          <Legend formatter={legendFormatter} iconType="square" iconSize={10} />
          <Bar dataKey="overnight_yes" name="Overnight Yes" fill="var(--risk-high)" stackId="a" />
          <Bar dataKey="overnight_no" name="Overnight No" fill="var(--risk-low)" stackId="a" radius={[3, 3, 0, 0]}>
            <LabelList content={(props) => <PctLabel {...props} data={data} />} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{
        padding: '10px 14px',
        background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)', fontSize: 12,
        color: 'var(--text-secondary)', lineHeight: 1.6,
      }}>
        <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>
          {totalON} of {totalAll} respondents ({((totalON / totalAll) * 100).toFixed(1)}%)
        </span>{' '}charge overnight.{' '}
        Chi-square p = <span style={{ color: significant ? 'var(--risk-low)' : 'var(--text-secondary)', fontWeight: 600 }}>{chiP}</span>
        {' — '}{significant ? 'statistically significant' : 'not significant (p > 0.05)'}
      </div>
    </ChartCard>
  );
}
