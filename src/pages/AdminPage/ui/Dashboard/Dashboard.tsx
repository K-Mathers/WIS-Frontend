import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getDashboard } from "@/api/admin";
import type { IDashboardData, ITask } from "@/api/admin/types";
import MissionModal from "./MissionModal";

const Dashboard = () => {
  const [dashData, setDashData] = useState<IDashboardData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const getDashboardStats = async () => {
    try {
      const data = await getDashboard();
      setDashData(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getDashboardStats();
  }, []);

  const handleCreateMission = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  }

  const handleEditMission = (task: ITask) => {
    setSelectedTask(task)
    setIsModalOpen(true)
  }

  return (
    <main className="comic-main">
      <section className="stats-grid">
        <div className="comic-card yellow">
          <h3>ACTIVE USERS</h3>
          <p className="stat-value">{dashData?.stats.totalUser}</p>
        </div>
        <div className="comic-card red">
          <h3>ARTICLES</h3>
          <p className="stat-value">{dashData?.stats.totalArticles}</p>
        </div>
        <div className="comic-card blue">
          <h3>NEW MESSAGES</h3>
          <p className="stat-value">{dashData?.stats.newMessages}</p>
        </div>
      </section>

      <section className="comic-panel table-panel">
        <div className="panel-header">
          <h2>RECENT MISSIONS (TASKS)</h2>
          <button className="comic-btn" onClick={handleCreateMission}>CREATE MISSION</button>
        </div>
        <table className="comic-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>MISSION</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {dashData?.missions.map((task) => (
              <tr key={task.id}>
                <td title={task.id}>#{task.id.slice(0, 4)}</td>
                <td>{task.title}</td>
                <td>
                  <span className={`status-tag ${task.status.toLowerCase()}`}>
                    {task.status}
                  </span>
                </td>
                <td>
                  <button className="comic-btn" onClick={() => handleEditMission(task)}>VIEW</button>
                </td>
              </tr>
            ))}
            {dashData?.missions.length === 0 && (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  No tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
      <MissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={getDashboardStats}
        task={selectedTask}
      />
    </main>
  );
};

export default Dashboard;
