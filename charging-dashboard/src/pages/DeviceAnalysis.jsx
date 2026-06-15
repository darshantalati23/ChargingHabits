import useData from '../utils/useData';
import DeviceAgeBar from '../components/charts/DeviceAgeBar';
import WattageBar from '../components/charts/WattageBar';
import WattageThresholdScatter from '../components/charts/WattageThresholdScatter';
import AgeWattageGroupedBar from '../components/charts/AgeWattageGroupedBar';
import PersonaCards from '../components/charts/PersonaCards';

const row = { gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))' };

export default function DeviceAnalysis() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  return (
    <div className="page-shell">
      <h1 className="page-title">Device Analysis</h1>

      {/* Row 1 — Device age | Charger wattage */}
      <div className="dashboard-row" style={row}>
        <DeviceAgeBar data={data.a3_device_age} />
        <WattageBar   data={data.a4_wattage} />
      </div>

      {/* Row 2 — Scatter full width */}
      <div className="dashboard-row" style={{ display: 'block' }}>
        <WattageThresholdScatter data={data.a6_wattage_threshold_scatter} />
      </div>

      {/* Row 3 — Grouped bar | Persona cards */}
      <div className="dashboard-row" style={row}>
        <AgeWattageGroupedBar data={data.b3_age_wattage} />
        <PersonaCards data={data.a8_personas} />
      </div>
    </div>
  );
}
