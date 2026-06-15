export const cardStyle = {
  background: 'var(--bg-card)',
  borderRadius: 'var(--radius-card)',
  border: '1px solid var(--border-subtle)',
  borderTop: '2px solid var(--accent-blue)',
  boxShadow: 'var(--shadow-card)',
  padding: '20px 22px 16px',
  height: '100%',
};

export const titleStyle = {
  margin: '0 0 12px 0',
  fontSize: 11,
  fontWeight: 700,
  color: 'var(--text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
};

export const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'var(--tooltip-bg)',
    border: '1px solid var(--tooltip-border)',
    borderRadius: 'var(--radius-sm)',
    color: 'var(--tooltip-text)',
    fontSize: 12,
    padding: '8px 12px',
    boxShadow: 'var(--shadow-hover)',
  },
  labelStyle: { color: 'var(--text-accent)', fontWeight: 600, marginBottom: 4 },
  itemStyle: { color: 'var(--tooltip-text)' },
  cursor: { fill: 'rgba(14,165,233,0.06)' },
};

export const scatterTooltipStyle = {
  ...tooltipStyle,
  cursor: { strokeDasharray: '3 3', stroke: 'var(--border-active)' },
};

export const axisProps = {
  tick: { fill: 'var(--text-muted)', fontSize: 11 },
  axisLine: { stroke: 'var(--border-subtle)' },
  tickLine: false,
};

export const gridProps = {
  strokeDasharray: '3 3',
  stroke: 'var(--border-subtle)',
};
