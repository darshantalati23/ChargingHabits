import ChartCard from '../ChartCard';

const cell = (bg, color, label, count) => ({ bg, color, label, count });

export default function ConfusionMatrix({ matrix }) {
  if (!matrix) return null;

  const [[TN, FP], [FN, TP]] = matrix;
  const precision = TP + FP > 0 ? TP / (TP + FP) : 0;
  const recall    = TP + FN > 0 ? TP / (TP + FN) : 0;
  const f1        = precision + recall > 0 ? 2 * precision * recall / (precision + recall) : 0;

  const cells = [
    [cell('rgba(16,185,129,0.08)', 'var(--risk-low)', 'TN', TN), cell('rgba(239,68,68,0.08)', 'var(--risk-high)', 'FP', FP)],
    [cell('rgba(239,68,68,0.08)', 'var(--risk-high)', 'FN', FN), cell('rgba(16,185,129,0.08)', 'var(--risk-low)', 'TP', TP)],
  ];

  const th = {
    padding: '8px 14px', color: 'var(--text-muted)', fontSize: 11,
    fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
  };
  const tdBase = {
    padding: '18px 24px', textAlign: 'center', borderRadius: 'var(--radius-sm)',
    fontSize: '1.4rem', fontWeight: 700, width: '50%',
    border: '1px solid var(--border-subtle)',
  };

  return (
    <ChartCard title="Risk Classifier Confusion Matrix">
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 6 }}>
        <thead>
          <tr>
            <th style={th} />
            <th style={{ ...th, color: 'var(--text-secondary)' }}>Pred: Low</th>
            <th style={{ ...th, color: 'var(--text-secondary)' }}>Pred: High</th>
          </tr>
        </thead>
        <tbody>
          {cells.map((row, ri) => (
            <tr key={ri}>
              <th style={{ ...th, textAlign: 'right', color: 'var(--text-secondary)' }}>
                {ri === 0 ? 'Actual: Low' : 'Actual: High'}
              </th>
              {row.map(({ bg, color, label, count }, ci) => (
                <td key={ci} style={{ ...tdBase, background: bg, color }}>
                  <div>{count}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, opacity: 0.7, marginTop: 3 }}>{label}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        {[
          { label: 'Precision', value: precision },
          { label: 'Recall',    value: recall    },
          { label: 'F1 Score',  value: f1        },
        ].map(({ label, value }) => (
          <div key={label} style={{
            flex: 1, minWidth: 80, background: 'var(--bg-surface)', borderRadius: 8,
            padding: '10px 14px', textAlign: 'center',
            border: '1px solid var(--border-subtle)',
          }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-violet)' }}>
              {value.toFixed(3)}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
