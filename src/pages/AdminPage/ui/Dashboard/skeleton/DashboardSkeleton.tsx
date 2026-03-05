import { Skeleton } from "antd";
import "../Dashboard.css";

const DashboardSkeleton = () => {
    return (
        <>
            <section className="stats-grid">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="comic-card" style={{ background: "#eee", transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(1deg)" }}>
                        <Skeleton active title={{ width: "60%" }} paragraph={{ rows: 1, width: "40%" }} />
                    </div>
                ))}
            </section>

            <section className="comic-panel table-panel">
                <div className="panel-header">
                    <Skeleton.Input active style={{ width: 200 }} />
                    <Skeleton.Button active style={{ width: 150 }} />
                </div>
                <div className="comic-table-wrapper">
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
                            {[1, 2, 3, 4, 5].map((i) => (
                                <tr key={i}>
                                    <td><Skeleton.Input active size="small" style={{ width: 40 }} /></td>
                                    <td><Skeleton.Input active size="small" style={{ width: '80%' }} /></td>
                                    <td><Skeleton.Input active size="small" style={{ width: 60 }} /></td>
                                    <td><Skeleton.Button active size="small" style={{ width: 60 }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default DashboardSkeleton;
