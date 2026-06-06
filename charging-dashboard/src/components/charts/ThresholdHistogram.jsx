import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceArea, ResponsiveContainer, Cell,
} from 'recharts';
import { tooltipStyle, axisProps, gridProps } from './shared';
import ChartCard from '../ChartCard';

const COMMON_BIN = '20-30%';

export default function ThresholdHistogram({ data, median }) {
  if (!data) return null;
  return (
    <ChartCard
      title="Battery % When Users Plug In"
      subtitle={`Median plug-in threshold: ${median}%`}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 28 }}>
          <CartesianGrid {...gridProps} vertical={false} />
          <XAxis dataKey="bin" {...axisProps} interval={0} angle={-35} textAnchor="end" />
          <YAxis {...axisProps} allowDecimals={false} />
          <Tooltip {...tooltipStyle} formatter={(v) => [v + ' respondents', 'Count']} />
          <ReferenceArea x1={COMMON_BIN} x2={COMMON_BIN} fill="var(--accent-blue)" fillOpacity={0.12} />
          <ReferenceLine
            x={COMMON_BIN}
            stroke="var(--accent-blue)"
            strokeDasharray="5 3"
            strokeWidth={2}
            label={{ value: '← median', position: 'insideTopRight', fill: 'var(--accent-violet)', fontSize: 11 }}
          />
          <Bar dataKey="count" radius={[3, 3, 0, 0]}>
            {data.map(entry => (
              <Cell
                key={entry.bin}
                fill={entry.bin === COMMON_BIN ? 'var(--accent-blue)' : 'var(--accent-violet)'}
                fillOpacity={entry.bin === COMMON_BIN ? 1 : 0.55}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
