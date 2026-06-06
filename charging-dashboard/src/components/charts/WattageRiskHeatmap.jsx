import ChartCard from '../ChartCard';

const WATTAGE_ORDER = ['<18W', '18-25W', '25-30W', '30-45W', '45-65W', '65W+'];
const RISK_ORDER    = ['low', 'medium', 'high'];
const RISK_LABELS   = { low: 'Low', medium: 'Medium', high: 'High' };
const RISK_COLORS   = { low: '#34d399', medium: '#fb923c', high: '#f43f5e' };

export default function WattageRiskHeatmap({ data, chiP }) {
  if (!data) return null;

  const map = {};
  data.forEach(({ wattage, risk, count }) => {
    if (!map[wattage]) map[wattage] = {};
    map[wattage][risk] = count;
  });

  const maxCount = Math.max(...data.map(d => d.count), 1);
  const isSignificant = chiP < 0.05;

  function cellBg(count) {
    if (count === 0) return 'transparent';
    return `rgba(56,189,248,${(0.08 + (count / maxCount) * 0.82).toFixed(2)})`;
  }
  function textColor(count) {
    return count / maxCount > 0.45 ? 'var(--text-primary)' : 'var(--text-secondary)';
  }

  const th = {
    padding: '7px 12px', fontSize: 11, fontWeight: 600,
    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
    textAlign: 'center',
  };

  return (
    <ChartCard title="Charger Wattage × Risk Category">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 4, minWidth: 320 }}>
          <thead>
            <tr>
              <th style={{ ...th, textAlign: 'left', width: 72 }}>Wattage</th>
              {RISK_ORDER.map(r => (
                <th key={r} style={{ ...th, color: RISK_COLORS[r] }}>{RISK_LABELS[r]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {WATTAGE_ORDER.map(wattage => (
              <tr key={wattage}>
                <td style={{ fontSize: 12, color: 'var(--text-secondary)', padding: '6px 4px', whiteSpace: 'nowrap' }}>
                  {wattage}
                </td>
                {RISK_ORDER.map(risk => {
                  const count = map[wattage]?.[risk] ?? 0;
                  return (
                    <td key={risk} style={{
                      background: cellBg(count), color: textColor(count),
                      textAlign: 'center', padding: '10px 0',
                      borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600,
                      border: '1px solid var(--border-subtle)',
                    }}>
                      {count}
                    </td>
                  );
                })}
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
          ? <span style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', padding: '2px 9px', borderRadius: 10, fontSize: 11, fontWeight: 600 }}>Significant</span>
          : <span style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', padding: '2px 9px', borderRadius: 10, fontSize: 11, border: '1px solid var(--border-subtle)' }}>Not significant (p &gt; 0.05)</span>
        }
      </div>
    </ChartCard>
  );
}
