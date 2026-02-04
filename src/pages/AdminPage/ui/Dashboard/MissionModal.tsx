import type { ITask } from "@/api/admin/types";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { createTask, updateTask, deleteTask } from "@/api/admin";

interface IMissionModal {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    task?: ITask | null;
}

const MissionModal = ({ isOpen, onClose, onSuccess, task }: IMissionModal) => {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">("TODO");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setStatus(task.status);
        } else {
            setTitle("");
            setStatus("TODO");
        }
    }, [task, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (task) {
                await updateTask(task.id, { title, status });
            } else {
                await createTask({ title });
            }
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!task) return;
        setLoading(true);
        try {
            await deleteTask(task.id);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={task ? "Edit Title" : "Create New Title"}
        >
            <form onSubmit={handleSubmit} className="mission-form">
                <label>
                    MISSION TITLE
                    <input
                        className="comic-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                {task && (
                    <label>
                        STATUS
                        <select
                            className="comic-input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as any)}
                        >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="DONE">DONE</option>
                        </select>
                    </label>
                )}
                <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                    <button type="submit" className="comic-btn yellow" disabled={loading}>
                        {loading ? "SAVING..." : "SAVE MISSION"}
                    </button>

                    {task && (
                        <button
                            type="button"
                            className="comic-btn red"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            DELETE
                        </button>
                    )}
                </div>
            </form>
        </Modal>
    );
};

export default MissionModal;
