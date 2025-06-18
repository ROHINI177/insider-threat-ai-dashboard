# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



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

🔮 Future Enhancements
WebSocket / Kafka real-time updates

Role-Based Access Control (RBAC)

Containerized Deployment (Docker, Fly.io)

Anomaly detection using machine learning

🙌 Author
Your Name
[LinkedIn](https://www.linkedin.com/in/rohini-sonawane-364b54301/) |(github)https://github.com/ROHINI177/insider-threat-ai-dashboard/edit/main/README.md