import useData from '../utils/useData';
import DeviceAgeBar from '../components/charts/DeviceAgeBar';
import WattageBar from '../components/charts/WattageBar';
import WattageThresholdScatter from '../components/charts/WattageThresholdScatter';
import AgeWattageGroupedBar from '../components/charts/AgeWattageGroupedBar';
import PersonaCards from '../components/charts/PersonaCards';

const row = { display: 'grid', gap: 16, marginBottom: 16 };

export default function DeviceAnalysis() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, marginTop: 0 }}>Device Analysis</h1>

      {/* Row 1 — Device age | Charger wattage */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <DeviceAgeBar data={data.a3_device_age} />
        <WattageBar   data={data.a4_wattage} />
      </div>

      {/* Row 2 — Scatter full width */}
      <div style={{ marginBottom: 16 }}>
        <WattageThresholdScatter data={data.a6_wattage_threshold_scatter} />
      </div>

      {/* Row 3 — Grouped bar | Persona cards */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <AgeWattageGroupedBar data={data.b3_age_wattage} />
        <PersonaCards data={data.a8_personas} />
      </div>
    </div>
  );
}
