import './Overview.css';
import useData from '../utils/useData';
import RiskDonut from '../components/charts/RiskDonut';
import ThresholdHistogram from '../components/charts/ThresholdHistogram';
import FrequencyBar from '../components/charts/FrequencyBar';
import OvernightPie from '../components/charts/OvernightPie';
import AIObservationsCard from '../components/charts/AIObservationsCard';

const STAT_CARDS = [
  { key: 'total',            label: 'Total Respondents', sublabel: 'survey participants', unit: '',  accent: 'var(--accent-blue)'   },
  { key: 'median_threshold', label: 'Median Plug-in %',  sublabel: 'battery at plug-in',  unit: '%', accent: 'var(--accent-violet)' },
  { key: 'high_risk_pct',    label: 'High Risk',          sublabel: 'of all respondents',  unit: '%', accent: 'var(--risk-high)'     },
  { key: 'medium_risk_pct',  label: 'Medium Risk',        sublabel: 'of all respondents',  unit: '%', accent: 'var(--risk-medium)'   },
];

export default function Overview() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  const stats = {
    total:            data.meta?.valid_respondents  ?? '—',
    median_threshold: data.meta?.median_threshold   ?? '—',
    high_risk_pct:    data.meta?.high_risk_pct      ?? '—',
    medium_risk_pct:  data.meta?.medium_risk_pct    ?? '—',
  };

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, marginTop: 0 }}>Overview</h1>

      {/* Row 1 — stat cards */}
      <div className="overview-stats">
        {STAT_CARDS.map(({ key, label, sublabel, unit, accent }) => (
          <div key={key} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-card)',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
              background: accent, borderRadius: '3px 0 0 3px',
            }} />
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', fontWeight: 600 }}>
              {label}
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>
              {stats[key]}{unit}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{sublabel}</div>
          </div>
        ))}
      </div>

      {/* Row 2 — RiskDonut | ThresholdHistogram | OvernightPie */}
      <div className="overview-row2">
        <RiskDonut data={data.a5_risk} />
        <ThresholdHistogram data={data.a1_threshold_hist} median={data.a1_median} />
        <OvernightPie data={data.a7_overnight} />
      </div>

      {/* Row 3 — FrequencyBar | AIObservationsCard */}
      <div className="overview-row3">
        <FrequencyBar data={data.a2_frequency} />
        <AIObservationsCard observations={data.ai_observations} />
      </div>
    </div>
  );
}
