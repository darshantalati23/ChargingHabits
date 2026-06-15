const ChartCard = ({ title, subtitle, children, accent = 'var(--accent-blue)', style = {} }) => (
  <div className="chart-card-hover" style={{
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-card)',
    border: '1px solid var(--border-subtle)',
    borderTop: `2px solid ${accent}`,
    boxShadow: 'var(--shadow-card)',
    padding: '20px 22px 16px',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    minHeight: 250,
    height: '100%',
    ...style,
  }}>
    <div>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--text-secondary)',
      }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</div>
      )}
    </div>
    {children}
  </div>
);

export default ChartCard;
