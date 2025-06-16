# 🔐 Insider Threat Detection Dashboard

A full-stack, real-time dashboard to detect and visualize suspicious user behavior in internal systems. Built using **React + D3.js**, **FastAPI**, **PostgreSQL**, and a Kafka-style simulator.

## 🚀 Features

- 🔒 **Login Authentication** (hardcoded demo: `admin/admin123`)
- 📝 **User Behavior Table**: shows real-time logs of user actions
- 🔥 **Live Risk Alerts**: flags `delete` actions and large file transfers
- 📊 **Risk Score Chart**: D3.js bar chart shows risk per user
- 💡 **Dynamic Risk Scoring**: `delete` adds +3, `download` +1, etc.

## 📦 Tech Stack

| Layer       | Technology               |
|-------------|---------------------------|
| Frontend    | React, Tailwind CSS, D3.js |
| Backend     | FastAPI, SQLAlchemy       |
| Database    | PostgreSQL                |
| Simulator   | Python (Kafka-style log generator) |
| Deployment  | Localhost / Deploy-ready (Fly.io, Replit) |

---

## 📂 Folder Structure

insider-threat-ai-dashboard/
├── backend/
│ ├── main.py # FastAPI app
│ └── kafka-simulator/
│ └── producer.py # Sends simulated logs
├── frontend/
│ ├── src/
│ │ ├── App.js # Dashboard UI logic
│ │ ├── RiskAlert.js
│ │ ├── RiskChart.js
│ │ ├── Login.js
│ │ └── index.js
│ └── tailwind.config.js


## ⚙️ How It Works

1. **Simulator** sends POST requests to backend with logs (`delete`, `download`, etc.)
2. **FastAPI backend** receives and stores logs in PostgreSQL (`behavior_logs`)
3. **React frontend** polls API every 10 seconds to fetch logs
4. Frontend shows:
   - A **log table**
   - A **D3.js bar chart** with risk scores
   - **Live alerts** for risky behavior

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/insider-threat-ai-dashboard.git
cd insider-threat-ai-dashboard

2.2. Setup PostgreSQL
CREATE DATABASE insider_db;

3. Start Backend
pip install fastapi uvicorn sqlalchemy psycopg2
uvicorn backend.main:app --reload

4. Start Frontend
cd frontend
npm install
npm start

5. Run Kafka-style Simulator
python backend/kafka-simulator/producer.py
🧪 Risk Alert Rules
delete → adds +3 risk points
download → +1
file_size > 750KB → triggers alert
Top 3 risky events shown in real-time

🙌 Author
Rohini Sonawane
[LinkedIn](https://www.linkedin.com/in/rohini-sonawane-364b54301/) |(github)https://github.com/ROHINI177/insider-threat-ai-dashboard/edit/main/README.md
