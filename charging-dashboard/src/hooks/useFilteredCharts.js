import { useMemo } from 'react';

const AGE_TO_NUMERIC = { '<1yr': 0.5, '1-2yr': 1.5, '2-3yr': 2.5, '3-4yr': 3.5, '4+yr': 4.5 };
// Proxy: usage categories map to b5 k-means clusters (0=Heavy Editing, 1=Gaming, 2=Normal)
const USAGE_TO_CLUSTER = { Normal: 2, Gaming: 1, 'Heavy Editing': 0 };

function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export default function useFilteredCharts(data, filter) {
  const filter_active = filter.type !== 'none';

  // b7: only has device_age — filterable by phone_age only
  const filteredScatter_b7 = useMemo(() => {
    if (!data) return [];
    if (filter.type !== 'phone_age') return data.b7_scatter;
    const target = AGE_TO_NUMERIC[filter.value];
    return data.b7_scatter.filter(r => r.device_age === target);
  }, [data, filter]);

  // b5: has device_age and cluster — filterable by both phone_age and usage_type
  const filteredScatter_b5 = useMemo(() => {
    if (!data) return [];
    if (filter.type === 'phone_age') {
      const target = AGE_TO_NUMERIC[filter.value];
      return data.b5_kmeans_scatter.filter(r => r.device_age === target);
    }
    if (filter.type === 'usage_type') {
      const cluster = USAGE_TO_CLUSTER[filter.value];
      return data.b5_kmeans_scatter.filter(r => r.cluster === cluster);
    }
    return data.b5_kmeans_scatter;
  }, [data, filter]);

  // a6: has wattage/threshold/risk but no device_age or usage_type — returned as-is
  const filteredScatter_a6 = useMemo(() => {
    if (!data) return [];
    return data.a6_wattage_threshold_scatter;
  }, [data]);

  // Aggregated charts (a1, a2, a3, a4, a5, b1, b2, b3, etc.) are pre-aggregated
  // over the full dataset — they cannot be filtered per-row and are returned as-is.

  const filteredStats = useMemo(() => {
    if (!data) return null;
    if (!filter_active) {
      return {
        total: data.meta.valid_respondents,
        median_threshold: data.meta.median_threshold,
        high_risk_pct: data.meta.high_risk_pct,
        medium_risk_pct: data.meta.medium_risk_pct,
      };
    }
    // Derive stats from filtered b5 scatter (has threshold and risk per respondent)
    const rows = filteredScatter_b5;
    const total = rows.length;
    if (!total) return { total: 0, median_threshold: 0, high_risk_pct: 0, medium_risk_pct: 0 };
    const med = median(rows.map(r => r.threshold));
    const highCount = rows.filter(r => r.risk === 'high').length;
    const medCount = rows.filter(r => r.risk === 'medium').length;
    return {
      total,
      median_threshold: Math.round(med * 10) / 10,
      high_risk_pct: Math.round((highCount / total) * 1000) / 10,
      medium_risk_pct: Math.round((medCount / total) * 1000) / 10,
    };
  }, [data, filter_active, filteredScatter_b5]);

  return { filteredScatter_a6, filteredScatter_b5, filteredScatter_b7, filter_active, filteredStats };
}
