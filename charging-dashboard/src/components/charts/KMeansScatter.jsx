import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const CLUSTER_COLORS = { 0: '#0284c7', 1: '#7c3aed', 2: '#059669', 3: '#ea580c' };
const CLUSTER_LABELS = { 0: 'Cluster 0', 1: 'Cluster 1', 2: 'Cluster 2', 3: 'Cluster 3 (outliers)' };

function CenterDot({ cx, cy, payload }) {
  const color = CLUSTER_COLORS[payload.cluster];
  const s = 10;
  return (
    <polygon
      points={`${cx},${cy - s} ${cx + s},${cy} ${cx},${cy + s} ${cx - s},${cy}`}
      fill={color} stroke="var(--bg-card)" strokeWidth={2}
    />
  );
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const color = CLUSTER_COLORS[d.cluster];
  return (
    <div style={{
      backgroundColor: 'var(--tooltip-bg)', border: '1px solid var(--tooltip-border)',
      padding: '8px 12px', borderRadius: 'var(--radius-sm)', fontSize: 12,
    }}>
      <p style={{ color, fontWeight: 700, margin: '0 0 4px' }}>Cluster {d.cluster}</p>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0' }}>Plug-in threshold: <span style={{ color: 'var(--tooltip-text)' }}>{d.threshold}%</span></p>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0' }}>Frequency: <span style={{ color: 'var(--tooltip-text)' }}>{d.frequency}×/day</span></p>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0' }}>Device age: <span style={{ color: 'var(--tooltip-text)' }}>{d.device_age}yr</span></p>
      <p style={{ color: 'var(--text-secondary)', margin: '2px 0', textTransform: 'capitalize' }}>Risk: <span style={{ color: 'var(--tooltip-text)' }}>{d.risk}</span></p>
    </div>
  );
}

function legendFormatter(value) {
  return <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>{value}</span>;
}

export default function KMeansScatter({ points, centers }) {
  if (!points || !centers) return null;
  const byCluster = [0, 1, 2, 3].map(c => points.filter(p => p.cluster === c));

  return (
    <ChartCard
      title="Data-Driven User Clusters (K-Means, k=4)"
      subtitle="Statistically derived — compared to paper's manually-defined personas"
    >
      <ResponsiveContainer width="100%" height={320}>
        <ScatterChart margin={{ top: 8, right: 20, bottom: 24, left: 0 }}>
          <CartesianGrid {...gridProps} />
          <XAxis
            dataKey="threshold" type="number" name="Plug-in %" unit="%" domain={[0, 105]}
            {...axisProps}
            label={{ value: 'Plug-in Threshold (%)', position: 'insideBottom', offset: -14, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <YAxis
            dataKey="frequency" type="number" name="Frequency" domain={[0, 2.5]}
            {...axisProps}
            label={{ value: 'Charges per Day', angle: -90, position: 'insideLeft', offset: 12, fill: 'var(--text-muted)', fontSize: 11 }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: 'var(--border-active)' }} />
          <Legend formatter={legendFormatter} iconType="circle" iconSize={8} />
          {byCluster.map((data, c) => (
            <Scatter key={c} name={CLUSTER_LABELS[c]} data={data} fill={CLUSTER_COLORS[c]} fillOpacity={0.65} r={4} />
          ))}
          <Scatter name="Centers" data={centers} shape={(props) => <CenterDot {...props} />} legendType="none" />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
