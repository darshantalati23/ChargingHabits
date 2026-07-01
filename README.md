# ⚡ Smart Charging Behavior Analysis Dashboard

A full-stack data analysis platform studying smartphone charging habits across 222 real survey respondents. The project features a Python statistical pipeline, Gemini Vision API screenshot extraction, and an interactive React dashboard with global filtering.

---

## 📌 Project Overview

This platform reproduces the findings of our research paper on smartphone charging habits while expanding upon it to uncover deeper behavioral patterns.

By fusing survey responses with multimodal analysis of actual device battery screenshots, the project:

1. Validates self-reported survey data against real device-logged statistics.
2. Derives **11 new statistical insights** (e.g., correlations, regressions, and data-driven user clustering) not explored in the original paper.
3. Classifies charging habits into risk tiers to motivate a behavior-independent hardware cutoff framework.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LAYER 1 — ANALYSIS                           │
│                             (Python)                                │
│                                                                     │
│  Survey CSV ─────────► pandas cleaning ─────► scipy stats           │
│                              │                      │               │
│                              ▼                      ▼               │
│                     sklearn ML models         chi2 / pearsonr       │
│                      (KMeans, LogReg)        (B-group insights)     │
│                              │                                      │
│  Device Screenshots ─► Gemini Vision API ──► structured JSON        │
│  (220+ images)          (image→data)         (C-group insights)     │
│                              │                                      │
│                              ▼                                      │
│                       master_data.json  ◄── final export            │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ (static dataset)
┌──────────────────────────────▼──────────────────────────────────────┐
│                        LAYER 2 — DISPLAY                            │
│                         (React + Recharts)                          │
│                                                                     │
│  master_data.json ──► useData hook ──► useState / useMemo           │
│                                              │                      │
│                              ┌───────────────┼───────────────┐      │
│                              ▼               ▼               ▼      │
│                         Overview       Device Stats    Statistical  │
│                           Page           Page          Findings     │
│                              └───────────────┴───────────────┘      │
│                                     Global Filter                   │
│                               (Phone Age / Usage Type)              │
└─────────────────────────────────────────────────────────────────────┘
```

**Design Principle:** The React front-end operates as a zero-backend dashboard. It consumes a structured JSON compiled by the Python processing pipeline, ensuring instant loading times, zero API dependency at runtime, and fully client-side routing.

---

## 📊 Summary of Analytics & Insights

The pipeline analyzes behavioral and device attributes across three core categories:

- **Group A (Paper Reproductions):** Visualizes the core survey findings—including plug-in threshold distribution (20% median), charging frequency, device age distribution, charger wattage, and overnight charging prevalence.
- **Group B (Advanced Statistical Findings):** Extends the research with data-driven modeling:
  - **Logistic Regression:** Predicts high-risk users using behavioral features.
  - **K-Means Clustering:** Segments the population into empirical user profiles.
  - **Statistical Tests:** Evaluates relationships between usage intensity, charging frequency, charger wattage, and battery risk category via Chi-Square and Pearson correlation.
  - **Energy Waste Projections:** Quantifies daily standby energy loss based on charging patterns.
- **Group C (Screenshot Validation):** Processes user-submitted device settings screenshots to programmatically extract screen-on time, drain rates, and charge event distributions, then cross-validates them against self-reported thresholds.

---

## 🔑 Key Engineering & Architectural Decisions

### Zero-Backend & Runtime Performance

To bypass backend latency and eliminate runtime API costs, the Gemini multimodal pipeline and scikit-learn models run once during the compilation phase. The React front-end is served statically and consumes the generated JSON file directly, providing zero-latency loading and clean client-side state management.

### Checkpoint-Resume & Auto-Repair Pipeline

The Gemini screenshot extraction pipeline features a stateful checkpoint-resume mechanism. If the batch processing job is interrupted due to quota limitations or network issues, it picks up exactly where it paused. A self-healing algorithm checks the checkpoint file, detects failed API attempts, and targets only unresolved entries.

### High-Performance Client-Side Filtering

Global filters (e.g., Phone Age and Usage Type) are implemented at the application root state. A custom hook leverages React's `useMemo` to cache filtered aggregates and chart data, preventing redundant re-computations and ensuring fluid transitions at 60 FPS.

### Machine Learning Segmentation vs. Manual Intuition

While the original paper classified users qualitatively, this platform implements a K-Means algorithm to group users mathematically. Comparing the clusters to the manual personas highlights the gap between intuitive user profiling and empirical, data-driven segmentation.

---

<!-- ## 📈 SDE Impact & Resume Summary

- **Statistical Data Pipeline:** Cleaned and analyzed a multi-feature dataset using **pandas**; applied **scipy** (Chi-Square, Pearson r) to validate and discover new charging behavior relationships.
- **Applied Machine Learning:** Developed a **K-Means** segmentation model to challenge qualitative personas and trained a **Logistic Regression** classifier to predict device battery risk categories with cross-validated performance metrics.
- **Computer Vision Pipeline:** Engineered an automated data extraction flow using the **Gemini Vision API** to programmatically translate 220+ unstructured Android/iOS battery screenshots into structured JSON, integrating checkpoint-resume and self-healing error handling.
- **Interactive React Dashboard:** Built a highly responsive front-end dashboard utilizing **Recharts** for data visualization and optimized state propagation using `useMemo` for real-time global filter rendering. -->

---

## 🙏 Data & Privacy Attribution

Survey data and screenshots were collected anonymously from 222 participants for academic purposes. In compliance with privacy guidelines, raw user screenshots and personal identifiers are excluded from the public repository and are processed entirely within a local secure environment.
