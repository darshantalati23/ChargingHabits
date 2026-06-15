import ChartCard from '../ChartCard';

const ACCENT_COLORS = ['var(--accent-blue)', 'var(--accent-orange)', 'var(--risk-high)', 'var(--risk-low)'];
const ACCENT_BG    = ['rgba(14,165,233,0.08)', 'rgba(249,115,22,0.08)', 'rgba(239,68,68,0.08)', 'rgba(16,185,129,0.08)'];

export default function PersonaCards({ data }) {
  if (!data) return null;
  return (
    <ChartCard title="User Personas" style={{ minHeight: 'unset' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {data.map((persona, i) => (
          <div key={persona.name} style={{
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            padding: '14px 16px',
            borderTop: `2px solid ${ACCENT_COLORS[i]}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
              <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13, lineHeight: 1.3 }}>
                {persona.name}
              </span>
              <span style={{
                background: ACCENT_BG[i], color: ACCENT_COLORS[i],
                borderRadius: 10, padding: '2px 9px',
                fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', flexShrink: 0,
              }}>
                {persona.percent}%
              </span>
            </div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.55 }}>
              {persona.description}
            </p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
