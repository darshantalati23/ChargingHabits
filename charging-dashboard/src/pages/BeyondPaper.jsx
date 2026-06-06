import useData from '../utils/useData';
import OvernightByAgeBar      from '../components/charts/OvernightByAgeBar';
import UsageRiskHeatmap       from '../components/charts/UsageRiskHeatmap';
import ThresholdBoxPlot       from '../components/charts/ThresholdBoxPlot';
import EnergyWasteBar         from '../components/charts/EnergyWasteBar';
import RuleAdoptionPie        from '../components/charts/RuleAdoptionPie';
import PercentileChart        from '../components/charts/PercentileChart';
import ScreenshotInsightsCard from '../components/charts/ScreenshotInsightsCard';

const row = { display: 'grid', gap: 16, marginBottom: 16 };

export default function BeyondPaper() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, marginTop: 0 }}>Deep Dive</h1>

      {/* Row 1 — Overnight by age | Usage × Risk heatmap */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <OvernightByAgeBar
          data={data.b1_overnight_by_age}
          chiP={data.b1_chi2_p}
          significant={data.b1_significant}
        />
        <UsageRiskHeatmap
          data={data.b2_usage_risk_heatmap}
          chiP={data.b2_chi2_p}
        />
      </div>

      {/* Row 2 — Threshold box plot, full width */}
      <div style={{ marginBottom: 16 }}>
        <ThresholdBoxPlot data={data.b4_threshold_by_usage} />
      </div>

      {/* Row 3 — Energy waste | [Rule adoption + Percentile curve stacked] */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <EnergyWasteBar data={data.b6_energy_waste} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <RuleAdoptionPie  data={data.b10_rule_adoption} />
          <PercentileChart  data={data.b11_threshold_percentiles} />
        </div>
      </div>

      {/* Row 4 — Screenshot insights, full width */}
      <div>
        <ScreenshotInsightsCard
          summary={data.screenshot_summary}
          c1={data.c1_screen_on_dist}
          c2={data.c2_drain_rate_dist}
          c3={data.c3_charge_time_dist}
          validation={data.c4_validation}
        />
      </div>
    </div>
  );
}
