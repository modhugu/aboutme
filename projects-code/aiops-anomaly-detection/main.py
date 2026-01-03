import pandas as pd
from prometheus_api_client import PrometheusConnect
import datetime
from sklearn.ensemble import IsolationForest
import time

# Connect to Prometheus
prom = PrometheusConnect(url="http://localhost:9090", disable_ssl=True)

def fetch_and_detect():
    # Fetch memory usage for the last 1 hour
    start_time = datetime.datetime.now() - datetime.timedelta(hours=1)
    end_time = datetime.datetime.now()
    
    print(f"Fetching data from {start_time} to {end_time}...")
    
    # Query: node_memory_Active_bytes
    metric_data = prom.get_metric_range_data(
        "node_memory_Active_bytes",
        start_time=start_time,
        end_time=end_time,
    )

    if not metric_data:
        print("No data found.")
        return

    # Convert to DataFrame
    df = pd.DataFrame(metric_data[0]['values'], columns=['timestamp', 'value'])
    df['value'] = df['value'].astype(float)
    
    # Initialize Isolation Forest
    model = IsolationForest(contamination=0.05) # Assume 5% anomalies
    df['anomaly'] = model.fit_predict(df[['value']])
    
    # -1 indicates an anomaly
    anomalies = df[df['anomaly'] == -1]
    
    if not anomalies.empty:
        print(f"Detected {len(anomalies)} anomalies!")
        print(anomalies.tail())
    else:
        print("No anomalies detected.")

if __name__ == "__main__":
    while True:
        fetch_and_detect()
        time.sleep(60) # Run every minute
