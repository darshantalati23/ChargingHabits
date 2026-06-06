import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const AGE_LABELS = { 0.5: '<1yr', 1.5: '1-2yr', 2.5: '2-3yr', 3.5: '3-4yr', 4.5: '4+yr' };

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={{
      backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)',
      padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: 12,
    }}>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0' }}>
        Device age: <span style={{ color: 'var(--tooltip-text)' }}>{AGE_LABELS[d.device_age] ?? d.device_age}</span>
      </p>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0' }}>
        Frequency: <span style={{ color: 'var(--tooltip-text)' }}>{d.frequency}×/day</span>
      </p>
    </div>
  );
}

export default function PearsonScatter({ data, pearsonR, pearsonP }) {
  if (!data) return null;
  const isSignificant = pearsonP < 0.05;

  return (
    <ChartCard title="Device Age vs Charging Frequency (Pearson r)">
      <div style={{ position: 'relative' }}>
        <ResponsiveContainer width="100%" height={260}>
          <ScatterChart margin={{ top: 8, right: 20, bottom: 24, left: 0 }}>
            <CartesianGrid {...gridProps} />
            <XAxis
              dataKey="device_age" type="number" name="Device Age" domain={[0, 5.5]}
              ticks={[0.5, 1.5, 2.5, 4.5]} tickFormatter={v => AGE_LABELS[v] ?? v}
              {...axisProps}
              label={{ value: 'Device Age', position: 'insideBottom', offset: -14, fill: 'var(--text-muted)', fontSize: 11 }}
            />
            <YAxis
              dataKey="frequency" type="number" name="Frequency" domain={[0, 2.5]}
              {...axisProps}
              label={{ value: 'Charges/Day', angle: -90, position: 'insideLeft', offset: 12, fill: 'var(--text-muted)', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--border-active)' }} />
            <Scatter data={data} fill="var(--accent-blue)" fillOpacity={0.45} r={5} name="Respondents" />
          </ScatterChart>
        </ResponsiveContainer>
        <div style={{
          position: 'absolute', top: 12, right: 28,
          background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: 12,
        }}>
          <p style={{ margin: 0, color: 'var(--text-primary)', fontWeight: 600 }}>
            r = {pearsonR} &nbsp; p = {pearsonP}
          </p>
          {isSignificant
            ? <span style={{ color: 'var(--risk-low)', fontSize: 11, fontWeight: 600 }}>✓ Statistically Significant</span>
            : <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>Not significant (p &gt; 0.05)</span>
          }
        </div>
      </div>
    </ChartCard>
  );
}
