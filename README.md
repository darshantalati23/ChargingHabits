# ⚡ Smart Charging Behavior Analysis Dashboard

> A full-stack data analysis platform studying smartphone charging habits across 222 real survey respondents — combining a Python/Colab statistical pipeline, Gemini Vision API screenshot extraction, and a React dashboard with global filtering.

<br>

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![pandas](https://img.shields.io/badge/pandas-2.x-150458?style=for-the-badge&logo=pandas&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-1.x-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)
![Google Colab](https://img.shields.io/badge/Google_Colab-notebook-F9AB00?style=for-the-badge&logo=google-colab&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_Vision_API-multimodal-4285F4?style=for-the-badge&logo=google&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Recharts](https://img.shields.io/badge/Recharts-2.x-22B5BF?style=for-the-badge)

---

## 📌 What Is This?

This project takes a **published research paper on smartphone charging habits** and goes further — reproducing its findings as interactive visualizations, then deriving **11 new statistical insights** the paper never explored, and extracting additional behavioral data from **220+ raw battery screenshots** using the Gemini Vision API.

The result is a zero-backend, data-driven dashboard that runs entirely from a single pre-built JSON file.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LAYER 1 — ANALYSIS                           │
│                     Google Colab (Python)                           │
│                                                                     │
│  Google Forms CSV ──► pandas cleaning ──► scipy stats               │
│                              │               │                      │
│                              ▼               ▼                      │
│                    sklearn ML models    chi2 / pearsonr             │
│                     (KMeans, LogReg)   (B-group insights)           │
│                              │                                      │
│  Drive Screenshots ──► Gemini Vision API ──► structured JSON        │
│  (220+ images)         (image→data)         (C-group insights)      │
│                              │                                      │
│                              ▼                                      │
│                    master_data.json  ◄── final export               │
└──────────────────────────────┬──────────────────────────────────────┘
                               │  (one static file, downloaded once)
┌──────────────────────────────▼──────────────────────────────────────┐
│                        LAYER 2 — DISPLAY                            │
│                React + Recharts (VS Code)                           │
│                                                                     │
│  master_data.json ──► useData hook ──► useState / useMemo           │
│                                              │                      │
│                              ┌───────────────┼───────────────┐      │
│                              ▼               ▼               ▼      │
│                         Overview       Device Stats    Statistical  │
│                           Page           Page          Findings     │
│                              └───────────────┴───────────────┘      │
│                                     Global Filter                   │
│                              (Phone Age / Usage Type)               │
└─────────────────────────────────────────────────────────────────────┘
```

**Key design principle:** React never calls any API. All intelligence lives in the Colab notebook. The JSON file is the contract between the two layers.

---

## 📊 23 Insights Across 3 Groups

### Group A — Reproduced from Paper (8 insights)

Insights from the research paper, now as interactive visualizations:

| #   | Insight                                                              | Chart                   |
| --- | -------------------------------------------------------------------- | ----------------------- |
| A1  | Plug-in threshold distribution — median 23.2%, IQR 20–30%            | Histogram + median line |
| A2  | Charging frequency — once/day most common, 39 people charge 4+×      | Bar chart               |
| A3  | Device age distribution across respondents                           | Bar chart               |
| A4  | Charger wattage — 25–30W dominant, 65W+ growing                      | Donut/bar               |
| A5  | **Risk breakdown — 12.4% high-risk, 40.7% medium-risk**              | Donut chart             |
| A6  | Charger wattage vs plug-in threshold — no significant correlation    | Scatter                 |
| A7  | Overnight charging prevalence                                        | Pie + stat              |
| A8  | 4 user personas (Convenience, Opportunistic, Power User, 20-80 Rule) | Card grid               |

### Group B — Beyond the Paper (11 new insights)

Derived from the same raw CSV — these are **not in the original paper**:

| #   | Insight                                                                            | Method                       |
| --- | ---------------------------------------------------------------------------------- | ---------------------------- |
| B1  | Does overnight charging increase with device age?                                  | Chi-square (scipy)           |
| B2  | Do gamers / heavy users cluster in high-risk?                                      | Chi-square + crosstab        |
| B3  | Do older phones use lower-wattage chargers?                                        | Grouped bar + chi-square     |
| B4  | Do gamers plug in at a lower battery % due to intensity?                           | groupby + box plot           |
| B5  | **Data-driven user clusters — statistically derived vs paper's manual personas**   | K-Means (scikit-learn)       |
| B6  | Estimated daily energy waste per risk group (kWh)                                  | pandas calculation           |
| B7  | **Pearson r: device age vs charging frequency with p-value**                       | pearsonr (scipy)             |
| B8  | **Logistic Regression: predict high-risk users** (CV accuracy, feature importance) | LogisticRegression (sklearn) |
| B9  | Chi-square: charger wattage × risk category with p-value                           | chi2_contingency             |
| B10 | 20-80 rule actual adoption rate (%)                                                | pandas filter                |
| B11 | Charging threshold percentile curve — safe zone vs real behavior                   | Quantile analysis            |

### Group C — Screenshot-Derived (4 insights)

Extracted from 220+ raw battery screenshots using Gemini Vision API, never manually labelled:

| #   | Insight                                                           | Source               |
| --- | ----------------------------------------------------------------- | -------------------- |
| C1  | Screen-on time distribution across users                          | Gemini extraction    |
| C2  | Battery drain rate (% per hour) from 24-hr graph                  | Gemini extraction    |
| C3  | Time-of-charging events — morning vs night patterns               | Graph slope analysis |
| C4  | Cross-validation: screenshot battery % vs self-reported threshold | pandas merge         |

---

## 🛠️ Tech Stack — End to End

### Analysis Layer (Google Colab)

| Tool                        | Version | Role in this project                                                          |
| --------------------------- | ------- | ----------------------------------------------------------------------------- |
| **Python**                  | 3.10+   | Everything                                                                    |
| **pandas**                  | 2.x     | CSV loading, cleaning, groupby, crosstab, feature engineering, JSON export    |
| **numpy**                   | 1.x     | Histogram binning, percentile computation, array math                         |
| **scipy**                   | 1.x     | `chi2_contingency` (B1–B3, B9), `pearsonr` (B7)                               |
| **scikit-learn**            | 1.x     | `KMeans` (B5), `LogisticRegression` (B8), `StandardScaler`, `cross_val_score` |
| **matplotlib / seaborn**    | —       | Colab-only validation plots — never shown in dashboard                        |
| **google-generativeai SDK** | —       | Gemini Vision API — sends each screenshot, parses structured JSON response    |
| **json** (stdlib)           | —       | Bridges Colab output to React via `master_data.json`                          |
| **Google Colab**            | —       | Runtime environment, Drive mount, GPU/CPU, checkpoint resumability            |
| **Google Drive**            | —       | Screenshot storage (220+ images), output JSON persistence                     |

### AI / Vision Layer (Gemini API)

The screenshot pipeline uses **Gemini Vision** (multimodal) to extract structured data from raw Android/iOS battery screenshots — handling cross-brand UI variation (Samsung Device Care, MIUI Security, iOS Battery, etc.) without any custom computer vision model.

Each image is sent with a structured extraction prompt. The model returns a JSON object containing:

```json
{
  "type": "full_day",
  "battery_percent": 66,
  "screen_on_time_mins": 183,
  "used_since_charge_mins": 683,
  "charging_events_visible": 2,
  "drain_pattern": "gradual",
  "approx_last_charge_hour": 22,
  "confidence": "high"
}
```

A **checkpoint-resume system** (`screenshot_checkpoint.json`) means the 200-image loop can be interrupted and resumed — no work is ever lost. An error-repair cell (Cell 11b) detects and retries all API/infra failures without touching valid data.

### Display Layer (React)

| Tool                 | Version  | Role                                                                           |
| -------------------- | -------- | ------------------------------------------------------------------------------ |
| **React**            | 18       | Component framework                                                            |
| **Recharts**         | 2.x      | BarChart, LineChart, PieChart, ScatterChart, ComposedChart                     |
| **react-router-dom** | 6.x      | Client-side routing across 4 pages                                             |
| **useState**         | built-in | Global filter state (Phone Age / Usage Type selector)                          |
| **useMemo**          | built-in | Recomputes filtered aggregates without redundant recalculation on every render |
| **useEffect**        | built-in | Loads `master_data.json` once on mount                                         |

---

## 📁 Project Structure

```
ChargingHabits/
├── Execution_Guide.md          ← Step-by-step Colab + VS Code playbook (14 cells)
├── Project_Plan.md             ← Full architecture, insight breakdown, learning timeline
├── screenshot_checkpoint.json  ← Live checkpoint of Gemini Vision extraction results
├── Smart Charging survey.pdf   ← Original research paper

charging-dashboard/ (React project)
├── public/data/master_data.json
└── src/
    ├── data/
    ├── components/
    │   ├── NavBar.jsx
    │   ├── GlobalFilter.jsx
    │   ├── ChartCard.jsx
    │   └── charts/            ← one component per chart
    ├── pages/
    │   ├── Overview.jsx
    │   ├── DeviceAnalysis.jsx
    │   ├── StatisticalFindings.jsx
    │   └── BeyondPaper.jsx
    ├── hooks/
    │   ├── useData.js
    │   └── useFilteredCharts.js
    └── App.jsx
```

<!-- ---

## 🚀 How to Run

### Step 1 — Run the Colab Analysis Pipeline

Open `Execution_Guide.md` and follow each cell in order (Cells 1–14) in [Google Colab](https://colab.research.google.com).

Requirements:
- Google account with Drive access
- Google Forms survey responses exported as `responses.csv`
- Screenshot folder in Google Drive (auto-created by Forms on file upload)
- A Gemini API key from [aistudio.google.com](https://aistudio.google.com) (free tier works)

At the end of Cell 14, download `master_data.json` from Drive.

### Step 2 — Run the React Dashboard

```bash
# Clone / open the React project
cd charging-dashboard
npm install

# Place the exported file
cp ~/Downloads/master_data.json public/data/master_data.json

# Start
npm start
```

The dashboard opens at `http://localhost:3000`.

> **No API keys in React. No backend. No CORS.** The JSON file is self-contained.

---

## 🔑 Key Design Decisions

### Zero-Backend Architecture
React reads a static JSON file — no server, no API proxy, no CORS. Gemini runs once in Colab during analysis. This means: instant page load, no API key exposure, no deployment complexity, fully reproducible by re-running the notebook.

### Checkpoint-Resume for Gemini Pipeline
The screenshot extraction loop saves progress every 2 images. If the session disconnects or the daily token limit is reached mid-run, re-running the cell resumes exactly where it left off. A dedicated repair cell (Cell 11b) detects all API/infra error entries in the checkpoint (wrong model name, missing key, quota exhaustion) and retries only those — never touching valid data.

### Pre-Generated AI Observations
After all analysis is complete, the aggregated statistics are fed to Gemini once to generate 12 "Smart Observations." These are saved into `master_data.json` as a static string array and rendered as a card in the dashboard. Result: the dashboard shows AI-generated insights with zero runtime API dependency.

### useMemo for Global Filtering
The global filter (Phone Age / Usage Type) is stored in a single `useState` at App.jsx level. A `useFilteredCharts` hook wraps `useMemo` to recompute filtered scatter data and derived stats (median threshold, risk %) only when the filter actually changes. No Redux, no Context API — `useMemo` + prop drilling is sufficient for this scale, and the memoization boundary is explicit and debuggable.

### Data-Driven Clustering vs Manual Personas
The research paper manually defined 4 user personas. This project runs K-Means (k=4) on the same population — the statistically derived clusters are compared directly against the paper's manual definitions. This is the strongest resume differentiator: proving that the paper's intuition was (or wasn't) reflected in the actual data.

---

## 📈 Resume Bullet Points

```
• Analyzed 221-response survey with pandas; applied chi-square and Pearson correlation
  to derive 11 novel behavioral insights beyond the original research paper

• Built K-Means user segmentation (scikit-learn) producing data-driven clusters to
  challenge the paper's manually-defined personas; trained Logistic Regression classifier
  for battery risk prediction (cross-validated accuracy XX%)

• Architected zero-backend pipeline: Python/Colab analysis → master_data.json export →
  React + Recharts dashboard with 15+ interactive visualizations and global state
  filtering (useState + useMemo) across 4 pages

• Engineered automated data extraction pipeline using Gemini Vision API to parse 200+
  unstructured smartphone battery screenshots (cross-brand Android/iOS layouts) into
  clean structured JSON, with checkpoint-resume and error-repair logic for quota safety
``` -->

---

## 🙏 Data & Attribution

Survey data collected from 222 anonymous respondents via Google Forms as part of an academic study on smartphone charging behavior. Screenshots submitted by respondents were processed programmatically and never stored or shared beyond this analysis pipeline.
