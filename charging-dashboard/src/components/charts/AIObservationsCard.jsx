import ChartCard from '../ChartCard';

export default function AIObservationsCard({ observations }) {
  if (!observations) return null;
  return (
    <ChartCard title="AI-Generated Insights" accent="var(--accent-violet)">
      <div className="custom-scroll-container">
        <div className="custom-scroll-area" style={{ maxHeight: 220 }}>
          {observations.map((obs, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10,
              padding: '10px 0',
              borderBottom: i < observations.length - 1 ? '1px solid var(--border-subtle)' : 'none',
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                background: 'var(--accent-blue)', marginTop: 6,
              }} />
              <p style={{ margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {obs}
              </p>
            </div>
          ))}
        </div>
        <div className="scroll-blur-overlay" />
      </div>
    </ChartCard>
  );
}
