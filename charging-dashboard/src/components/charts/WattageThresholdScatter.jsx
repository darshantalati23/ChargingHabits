import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const RISK_COLORS = { high: '#f43f5e', medium: '#fb923c', low: '#34d399' };
const RISK_LABELS = { high: 'High risk', medium: 'Medium risk', low: 'Low risk' };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={{
      backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)',
      padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: 12,
    }}>
      <p style={{ color: 'var(--tooltip-text)', margin: 0, fontWeight: 600 }}>{d.wattage_label}</p>
      <p style={{ color: 'var(--text-secondary)', margin: '3px 0 0' }}>Plug-in at: {d.threshold_pct}%</p>
      <p style={{ color: RISK_COLORS[d.risk], margin: '3px 0 0', textTransform: 'capitalize' }}>
        Risk: {d.risk}
      </p>
    </div>
  );
}

function legendFormatter(value) {
  return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>;
}

export default function WattageThresholdScatter({ data }) {
  if (!data) return null;

  const byRisk = { high: [], medium: [], low: [] };
  data.forEach(d => { if (byRisk[d.risk]) byRisk[d.risk].push(d); });

  return (
    <ChartCard title="Wattage vs Plug-In Threshold" subtitle="No significant correlation (r ≈ 0)">
      <ResponsiveContainer width="100%" height={280}>
        <ScatterChart margin={{ top: 8, right: 20, bottom: 24, left: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis
            dataKey="wattage_w" type="number" name="Wattage" unit="W" domain={[0, 100]}
            {...axisProps}
            label={{ value: 'Charger Wattage (W)', position: 'insideBottom', offset: -14, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <YAxis
            dataKey="threshold_pct" type="number" name="Plug-in %" unit="%" domain={[0, 105]}
            {...axisProps}
            label={{ value: 'Plug-in Threshold (%)', angle: -90, position: 'insideLeft', offset: 10, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--border-active)' }} />
          <Legend formatter={legendFormatter} iconType="circle" iconSize={8} />
          {Object.entries(byRisk).map(([risk, pts]) => (
            <Scatter key={risk} name={RISK_LABELS[risk]} data={pts} fill={RISK_COLORS[risk]} fillOpacity={0.8} r={5} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
