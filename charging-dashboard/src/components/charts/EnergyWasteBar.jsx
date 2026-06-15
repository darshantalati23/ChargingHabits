import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const RISK_COLORS = { high: '#ef4444', medium: '#f97316', low: '#10b981' };
const RISK_ORDER  = ['low', 'medium', 'high'];

export default function EnergyWasteBar({ data }) {
  if (!data) return null;

  const sorted = RISK_ORDER
    .map(r => data.find(d => d.risk === r))
    .filter(Boolean)
    .map(d => ({ ...d, label: d.risk.charAt(0).toUpperCase() + d.risk.slice(1) + ' Risk' }));

  const highWaste = data.find(d => d.risk === 'high')?.avg_waste_kwh ?? 0;
  const lowWaste  = data.find(d => d.risk === 'low')?.avg_waste_kwh ?? 0;
  const ratio     = lowWaste > 0 ? (highWaste / lowWaste).toFixed(1) : '—';

  return (
    <ChartCard title="Estimated Daily Energy Waste by Risk Group">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={sorted} margin={{ top: 20, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="label" {...axisProps} />
          <YAxis
            {...axisProps}
            tickFormatter={v => v === 0 ? '0' : v.toFixed(4)}
            label={{ value: 'kWh', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <Tooltip {...tooltipStyle} formatter={v => [v === 0 ? '0 kWh' : v.toFixed(4) + ' kWh', 'Avg Waste']} />
          <Bar dataKey="avg_waste_kwh" radius={[4, 4, 0, 0]} maxBarSize={72}>
            {sorted.map(entry => (
              <Cell key={entry.risk} fill={RISK_COLORS[entry.risk]} fillOpacity={0.85} />
            ))}
            <LabelList
              dataKey="avg_waste_kwh"
              position="top"
              formatter={v => v === 0 ? '0' : v.toFixed(4)}
              style={{ fill: 'var(--text-secondary)', fontSize: 11 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{
        padding: '10px 14px',
        background: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-subtle)', fontSize: 12,
        color: 'var(--text-secondary)', lineHeight: 1.6,
      }}>
        High-risk users waste{' '}
        <span style={{ color: 'var(--risk-high)', fontWeight: 600 }}>{(highWaste * 1000).toFixed(2)} Wh/day</span> on average —{' '}
        <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>{ratio}×</span> more than low-risk users.
        Extrapolated over a year:{' '}
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{(highWaste * 365 * 1000).toFixed(0)} Wh</span> per person.
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        * Estimate: overnight charging duration (7h) × charger wattage × 10% CV-phase waste
      </div>
    </ChartCard>
  );
}
