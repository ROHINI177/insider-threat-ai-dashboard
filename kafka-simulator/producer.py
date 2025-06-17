import time
import requests
from datetime import datetime, timezone

API_ENDPOINT = "http://localhost:8000/api/behavior"

def send_log():
    log = {
        "user_id": "u999",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "action": "delete",  # force risky action
        "file_size": 1000,   # force risky size
        "ip_address": "192.168.1.250"
    }

    try:
        response = requests.post(API_ENDPOINT, json=log)
        if response.status_code == 200:
            print(f"[SENT] {log} => Status: {response.status_code}")
        else:
            print(f"[ERROR] Response code: {response.status_code}, Detail: {response.text}")
    except Exception as e:
        print(f"[ERROR] Failed to send log: {e}")

if __name__ == "__main__":
    while True:
        send_log()
        time.sleep(3)
