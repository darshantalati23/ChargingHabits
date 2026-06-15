import ChartCard from '../ChartCard';

const RISK_ORDER  = ['low', 'medium', 'high'];
const RISK_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };
const RISK_COLORS = { low: '#10b981', medium: '#f97316', high: '#ef4444' };

function groupUsage(usage) {
  const u = usage.toLowerCase();
  const tags = [];
  if (u.includes('calls'))   tags.push('Calls');
  if (u.includes('gaming'))  tags.push('Gaming');
  if (u.includes('editing')) tags.push('Editing');
  if (u.includes("videos'")) tags.push('Video');
  if (u.includes('social'))  tags.push('Social');
  if (!tags.length)          tags.push('Basic');
  return tags.join(' + ');
}

export default function UsageRiskHeatmap({ data, chiP }) {
  if (!data) return null;

  const agg = {};
  data.forEach(({ usage, risk, count }) => {
    const group = groupUsage(usage);
    if (!agg[group]) agg[group] = {};
    agg[group][risk] = (agg[group][risk] ?? 0) + count;
  });

  const groups = Object.entries(agg)
    .map(([g, risks]) => ({ group: g, total: Object.values(risks).reduce((s, v) => s + v, 0), risks }))
    .sort((a, b) => b.total - a.total);

  const maxCount = Math.max(...groups.flatMap(g => Object.values(g.risks)), 1);
  const isSignificant = chiP < 0.05;

  function cellBg(count) {
    if (count === 0) return 'transparent';
    return `rgba(14,165,233,${(0.08 + (count / maxCount) * 0.82).toFixed(2)})`;
  }
  function textColor(count) {
    return count / maxCount > 0.45 ? 'var(--text-primary)' : 'var(--text-secondary)';
  }

  const th = {
    padding: '7px 10px', fontSize: 11, fontWeight: 600,
    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
    textAlign: 'center',
  };

  return (
    <ChartCard title="Usage Type × Risk Category">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 4 }}>
          <thead>
            <tr>
              <th style={{ ...th, textAlign: 'left', minWidth: 140 }}>Usage Group</th>
              {RISK_ORDER.map(r => <th key={r} style={{ ...th, color: RISK_COLORS[r] }}>{RISK_LABELS[r]}</th>)}
              <th style={{ ...th, color: 'var(--text-muted)' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {groups.map(({ group, total, risks }) => (
              <tr key={group}>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 4px', whiteSpace: 'nowrap' }}>
                  {group}
                </td>
                {RISK_ORDER.map(risk => {
                  const count = risks[risk] ?? 0;
                  return (
                    <td key={risk} style={{
                      background: cellBg(count), color: textColor(count),
                      textAlign: 'center', padding: '9px 0',
                      borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600,
                      border: '1px solid var(--border-subtle)',
                    }}>
                      {count}
                    </td>
                  );
                })}
                <td style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', padding: '0 6px' }}>
                  {total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          Chi-square p = <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{chiP}</span>
        </span>
        {isSignificant
          ? <span style={{ background: 'rgba(16,185,129,0.1)', color: 'var(--risk-low)', padding: '2px 9px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Significant</span>
          : <span style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', padding: '2px 9px', borderRadius: 10, fontSize: 11, border: '1px solid var(--border-subtle)' }}>Not significant (p &gt; 0.05)</span>
        }
      </div>
    </ChartCard>
  );
}
