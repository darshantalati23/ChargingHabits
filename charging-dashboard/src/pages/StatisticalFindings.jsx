import useData from '../utils/useData';
import KMeansScatter from '../components/charts/KMeansScatter';
import PearsonScatter from '../components/charts/PearsonScatter';
import FeatureImportanceBar from '../components/charts/FeatureImportanceBar';
import ConfusionMatrix from '../components/charts/ConfusionMatrix';
import WattageRiskHeatmap from '../components/charts/WattageRiskHeatmap';

const row = { display: 'grid', gap: 16, marginBottom: 16 };

export default function StatisticalFindings() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  return (
    <div style={{ padding: '28px 28px 48px' }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24, marginTop: 0 }}>Statistical Findings</h1>

      {/* Row 1 — K-Means scatter, full width */}
      <div style={{ marginBottom: 16 }}>
        <KMeansScatter
          points={data.b5_kmeans_scatter}
          centers={data.b5_cluster_centers}
        />
      </div>

      {/* Row 2 — Pearson scatter | Feature importance */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <PearsonScatter
          data={data.b7_scatter}
          pearsonR={data.b7_pearson_r}
          pearsonP={data.b7_pearson_p}
        />
        <FeatureImportanceBar logreg={data.b8_logreg} />
      </div>

      {/* Row 3 — Confusion matrix | Wattage-risk heatmap */}
      <div style={{ ...row, gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))' }}>
        <ConfusionMatrix matrix={data.b8_confusion_matrix} />
        <WattageRiskHeatmap data={data.b9_wattage_risk} chiP={data.b9_chi2_p} />
      </div>
    </div>
  );
}
