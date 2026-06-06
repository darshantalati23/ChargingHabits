import { useRef, useState, useEffect } from 'react';
import ChartCard from '../ChartCard';

function toLabel(usage) {
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

const TICKS = [0, 20, 40, 60, 80, 100];

export default function ThresholdBoxPlot({ data }) {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(600);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)));
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  if (!data) return null;

  const seen = {};
  const items = Object.entries(data)
    .filter(([_, v]) => v.count >= 5)
    .sort(([_, a], [__, b]) => b.count - a.count)
    .slice(0, 8)
    .map(([usage, stats]) => {
      let label = toLabel(usage);
      seen[label] = (seen[label] ?? 0) + 1;
      if (seen[label] > 1) label = `${label} (${seen[label]})`;
      return { label, ...stats };
    });

  const LABEL_W = 164;
  const PAD = { top: 22, right: 36, bottom: 32, left: LABEL_W };
  const ROW_H = 40;
  const chartW = Math.max(width - PAD.left - PAD.right, 60);
  const chartH = items.length * ROW_H + PAD.top + PAD.bottom;
  const xScale = v => (v / 100) * chartW;

  return (
    <ChartCard
      title="Plug-In Threshold by Usage Type"
      subtitle="Top usage groups (n≥5) — box = IQR, line = median, whiskers = min/max"
      style={{ minHeight: 'unset' }}
    >
      <div ref={containerRef} style={{ width: '100%' }}>
        <svg width={width} height={chartH} style={{ display: 'block', overflow: 'visible' }}>
          <rect
            x={PAD.left + xScale(20)} y={PAD.top}
            width={xScale(60)} height={chartH - PAD.top - PAD.bottom}
            fill="rgba(56,189,248,0.06)"
          />
          {TICKS.map(t => (
            <g key={t}>
              <line
                x1={PAD.left + xScale(t)} y1={PAD.top}
                x2={PAD.left + xScale(t)} y2={chartH - PAD.bottom}
                stroke="var(--border-subtle)" strokeWidth={1}
                strokeDasharray={t === 0 ? '' : '3 3'}
              />
              <text x={PAD.left + xScale(t)} y={chartH - PAD.bottom + 16}
                textAnchor="middle" fill="var(--text-muted)" fontSize={10}>{t}%</text>
            </g>
          ))}
          <text x={PAD.left + xScale(20)} y={PAD.top - 8} textAnchor="middle" fill="var(--accent-violet)" fontSize={9}>20%</text>
          <text x={PAD.left + xScale(80)} y={PAD.top - 8} textAnchor="middle" fill="var(--accent-violet)" fontSize={9}>80%</text>
          <text x={PAD.left + xScale(50)} y={PAD.top - 8} textAnchor="middle" fill="var(--accent-blue)" fontSize={9} opacity={0.5}>safe zone</text>

          {items.map((item, i) => {
            const cy = PAD.top + i * ROW_H + ROW_H / 2;
            const boxTop = cy - 10;
            const bxH = 20;
            const x = v => PAD.left + xScale(v);
            return (
              <g key={i}>
                <text x={PAD.left - 8} y={cy + 4} textAnchor="end" fill="var(--text-secondary)" fontSize={10.5}>{item.label}</text>
                <line x1={x(item.min)} y1={cy} x2={x(item.max)} y2={cy} stroke="var(--border-active)" strokeWidth={1.5} />
                <line x1={x(item.min)} y1={boxTop + 5} x2={x(item.min)} y2={boxTop + bxH - 5} stroke="var(--border-active)" strokeWidth={2} />
                <line x1={x(item.max)} y1={boxTop + 5} x2={x(item.max)} y2={boxTop + bxH - 5} stroke="var(--border-active)" strokeWidth={2} />
                <rect
                  x={x(item.q1)} y={boxTop}
                  width={Math.max(x(item.q3) - x(item.q1), 2)} height={bxH}
                  fill="rgba(56,189,248,0.15)" stroke="var(--accent-blue)" strokeWidth={1.5} rx={2}
                />
                <line x1={x(item.median)} y1={boxTop} x2={x(item.median)} y2={boxTop + bxH} stroke="var(--accent-violet)" strokeWidth={2.5} />
                <text x={x(item.max) + 5} y={cy + 4} fill="var(--text-muted)" fontSize={9}>n={item.count}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
