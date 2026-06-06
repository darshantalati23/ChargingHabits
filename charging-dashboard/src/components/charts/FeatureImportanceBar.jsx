import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Cell,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const FEATURE_LABELS = {
  plug_in_threshold:  'Plug-in Threshold',
  charge_frequency:   'Charge Frequency',
  device_age:         'Device Age',
  overnight_charging: 'Overnight Charging',
  random_charging:    'Random Charging',
};

export default function FeatureImportanceBar({ logreg }) {
  if (!logreg) return null;
  const { cv_accuracy_mean, cv_accuracy_std, feature_importance } = logreg;

  const data = [...feature_importance]
    .sort((a, b) => Math.abs(b.coefficient) - Math.abs(a.coefficient))
    .map(d => ({ ...d, name: FEATURE_LABELS[d.feature] ?? d.feature }));

  return (
    <ChartCard
      title="Logistic Regression: Feature Coefficients"
      subtitle={`High-risk prediction · CV Accuracy: ${(cv_accuracy_mean * 100).toFixed(1)}% ± ${(cv_accuracy_std * 100).toFixed(1)}%`}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart layout="vertical" data={data} margin={{ top: 4, right: 20, bottom: 4, left: 0 }}>
          <CartesianGrid {...gridProps} horizontal={false} />
          <XAxis type="number" domain={[-2.5, 2.5]} {...axisProps} tickFormatter={v => v.toFixed(1)} />
          <YAxis type="category" dataKey="name" width={148} {...axisProps} />
          <Tooltip {...tooltipStyle} formatter={(v) => [v.toFixed(3), 'Coefficient']} />
          <ReferenceLine x={0} stroke="var(--border-active)" strokeWidth={1.5} />
          <Bar dataKey="coefficient" radius={[0, 3, 3, 0]} maxBarSize={20}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.coefficient >= 0 ? 'var(--chart-1)' : 'var(--risk-high)'} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
