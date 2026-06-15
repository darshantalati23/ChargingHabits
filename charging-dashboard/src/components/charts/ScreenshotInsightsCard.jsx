import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { tooltipStyle } from './shared';
import ChartCard from '../ChartCard';

const MINI_H = 130;

function MiniBar({ data, xKey, title, color = 'var(--chart-1)' }) {
  return (
    <div>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {title}
      </p>
      <ResponsiveContainer width="100%" height={MINI_H}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 22 }}>
          <XAxis dataKey={xKey} tick={{ fill: 'var(--text-muted)', fontSize: 9 }} interval={0} angle={-35} textAnchor="end" tickLine={false} axisLine={{ stroke: 'var(--border-subtle)' }} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 9 }} allowDecimals={false} tickLine={false} axisLine={{ stroke: 'var(--border-subtle)' }} />
          <Tooltip {...tooltipStyle} formatter={v => [v, 'Count']} />
          <Bar dataKey="count" fill={color} radius={[2, 2, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ScreenshotInsightsCard({ summary, c1, c2, c3, validation }) {
  const hasCharts = c1?.length || c2?.length || c3?.length;

  return (
    <ChartCard title="Screenshot-Derived Insights" style={{ minHeight: 'unset' }}>
      {summary ? (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {[
            { label: 'Processed',        value: summary.total_processed  },
            { label: 'Valid (Full Day)',  value: summary.valid_full_day   },
            { label: 'Valid (Week View)', value: summary.valid_week_view  },
            { label: 'Eliminated',       value: summary.eliminated       },
          ].map(({ label, value }) => (
            <div key={label} style={{
              background: 'var(--bg-surface)', borderRadius: 8, padding: '10px 16px',
              textAlign: 'center', flex: '1 0 80px',
              border: '1px solid var(--border-subtle)',
            }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No screenshot metadata available.</p>
      )}

      {validation && (
        <div style={{
          background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)',
          borderLeft: '4px solid var(--risk-high)', borderRadius: 8,
          padding: '14px 18px',
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--risk-high)', lineHeight: 1 }}>
              {validation.match_percent}%
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
              Survey–Screenshot Alignment Rate
            </div>
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.55, flex: 1, minWidth: 180 }}>
            Only <strong style={{ color: 'var(--risk-high)' }}>{validation.match_percent}%</strong> of {validation.compared_pairs} survey–screenshot pairs
            matched within 15% tolerance. This large gap between self-reported and
            actual charging behaviour is the central finding of this research.
          </p>
        </div>
      )}

      {hasCharts ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {c1 && <MiniBar data={c1} xKey="bin" title="Screen-on Time" color="var(--chart-2)" />}
          {c2 && <MiniBar data={c2} xKey="bin" title="Battery Drain Rate" color="var(--chart-1)" />}
          {c3 && <MiniBar data={c3} xKey="period" title="Charge Time of Day" color="var(--chart-4)" />}
        </div>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No screenshot chart data available.</p>
      )}
    </ChartCard>
  );
}
