import { useEffect, useState } from "react";
import Card from "../Component/Card";
import {
  fetchDashboardSummary,
  fetchRecentActivities
} from "../Services/dashboardService";
import "./Dashboard.css";

export default function Dashboard() {
  // state for cards
  const [summary, setSummary] = useState({
    totalCompanies: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // state for recent activity
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);

      const summaryData = await fetchDashboardSummary();
      const activityData = await fetchRecentActivities();

      setSummary(summaryData);
      setActivities(activityData);

    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div className="dashboard-container">

      <h2>Admin Dashboard</h2>

      {/* Cards Section */}
      <div className="dashboard-cards">
        <Card title="Total Companies" value={summary.totalCompanies} type="total" />
        <Card title="Pending Requests" value={summary.pending} type="pending" />
        <Card title="Approved Companies" value={summary.approved} type="approved" />
        <Card title="Rejected Companies" value={summary.rejected} type="rejected" />
      </div>

      {/* Recent Activity */}
      <div className="recent-activity mt-5">
        <h4 className="activity-title">Recent Activity</h4>

        {activities.length === 0 ? (
          <p>No recent activity</p>
        ) : (
          <div className="activity-list">
            {activities.map((item, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-dot ${item.action.toLowerCase()}`}></div>

                <div className="activity-content">
                  <span className="activity-time">{item.time}</span>
                  <p>{item.message}</p>
                  <span className={`badge ${item.action.toLowerCase()}-badge`}>
                    {item.action}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
