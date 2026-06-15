import useData from '../utils/useData';
import KMeansScatter from '../components/charts/KMeansScatter';
import PearsonScatter from '../components/charts/PearsonScatter';
import FeatureImportanceBar from '../components/charts/FeatureImportanceBar';
import ConfusionMatrix from '../components/charts/ConfusionMatrix';
import WattageRiskHeatmap from '../components/charts/WattageRiskHeatmap';

const row = { gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))' };

export default function StatisticalFindings() {
  const { data, loading, error } = useData();

  if (loading) return <p style={{ color: 'var(--text-muted)', padding: 28 }}>Loading data…</p>;
  if (error)   return <p style={{ color: 'var(--risk-high)', padding: 28 }}>Error: {error}</p>;
  if (!data)   return null;

  return (
    <div className="page-shell">
      <h1 className="page-title">Statistical Findings</h1>

      {/* Row 1 — K-Means scatter, full width */}
      <div className="dashboard-row" style={{ display: 'block' }}>
        <KMeansScatter
          points={data.b5_kmeans_scatter}
          centers={data.b5_cluster_centers}
        />
      </div>

      {/* Row 2 — Pearson scatter | Feature importance */}
      <div className="dashboard-row" style={row}>
        <PearsonScatter
          data={data.b7_scatter}
          pearsonR={data.b7_pearson_r}
          pearsonP={data.b7_pearson_p}
        />
        <FeatureImportanceBar logreg={data.b8_logreg} />
      </div>

      {/* Row 3 — Confusion matrix | Wattage-risk heatmap */}
      <div className="dashboard-row" style={row}>
        <ConfusionMatrix matrix={data.b8_confusion_matrix} />
        <WattageRiskHeatmap data={data.b9_wattage_risk} chiP={data.b9_chi2_p} />
      </div>
    </div>
  );
}
