# AIOps Anomaly Detection

This project uses Python and Machine Learning to detect anomalies in system metrics fetched from Prometheus.

## Features
- Connects to Prometheus API.
- Fetches real-time time-series data.
- Uses **Isolation Forest** (Scikit-Learn) for unsupervised anomaly detection.
- Provides real-time alerts on detected metric spikes or drops.

## Setup
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Ensure Prometheus is running at `http://localhost:9090`.
3. Run the script:
   ```bash
   python main.py
   ```
