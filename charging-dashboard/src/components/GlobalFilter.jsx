import { useMemo } from 'react';
import useData from '../utils/useData';

const AGE_OPTIONS = ['All', '<1yr', '1-2yr', '2-3yr', '3-4yr', '4+yr'];
const USAGE_OPTIONS = ['All', 'Normal', 'Gaming', 'Heavy Editing'];

const AGE_TO_NUMERIC = { '<1yr': 0.5, '1-2yr': 1.5, '2-3yr': 2.5, '3-4yr': 3.5, '4+yr': 4.5 };
// Proxy: usage categories map to b5 k-means clusters (0=Heavy Editing, 1=Gaming, 2=Normal)
const USAGE_TO_CLUSTER = { Normal: 2, Gaming: 1, 'Heavy Editing': 0 };

const selectStyle = {
  background: 'var(--bg-surface)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 'var(--radius-sm)',
  padding: '5px 28px 5px 9px',
  fontSize: '0.82rem',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgb(15 23 42 / 0.04)',
};

const labelStyle = { color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 500 };

export default function GlobalFilter({ filter, setFilter }) {
  const { data } = useData();

  // Derive controlled values from the global filter — only one can be active at a time
  const phoneAge = filter.type === 'phone_age' ? filter.value : 'All';
  const usageType = filter.type === 'usage_type' ? filter.value : 'All';

  const matchCount = useMemo(() => {
    if (!data) return 0;
    if (filter.type === 'none') return data.meta.valid_respondents;
    if (filter.type === 'phone_age') {
      const target = AGE_TO_NUMERIC[filter.value];
      return data.b7_scatter.filter(r => r.device_age === target).length;
    }
    if (filter.type === 'usage_type') {
      const cluster = USAGE_TO_CLUSTER[filter.value];
      return data.b5_kmeans_scatter.filter(r => r.cluster === cluster).length;
    }
    return 0;
  }, [data, filter]);

  function handleAgeChange(e) {
    const val = e.target.value;
    setFilter(val === 'All' ? { type: 'none', value: null } : { type: 'phone_age', value: val });
  }

  function handleUsageChange(e) {
    const val = e.target.value;
    setFilter(val === 'All' ? { type: 'none', value: null } : { type: 'usage_type', value: val });
  }

  const isActive = filter.type !== 'none';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={labelStyle}>Phone Age</span>
        <select style={selectStyle} value={phoneAge} onChange={handleAgeChange}>
          {AGE_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <span style={labelStyle}>Usage</span>
        <select style={selectStyle} value={usageType} onChange={handleUsageChange}>
          {USAGE_OPTIONS.map(o => <option key={o}>{o}</option>)}
        </select>
      </div>
      <span style={{
        background: isActive ? 'var(--accent-blue)' : 'var(--bg-input)',
        color: isActive ? '#fff' : 'var(--text-secondary)',
        border: isActive ? '1px solid var(--accent-blue)' : '1px solid var(--border-subtle)',
        borderRadius: '12px',
        padding: '3px 11px',
        fontSize: '0.78rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        transition: 'background 0.2s, color 0.2s, border-color 0.2s',
      }}>
        n = {matchCount}
      </span>
    </div>
  );
}
