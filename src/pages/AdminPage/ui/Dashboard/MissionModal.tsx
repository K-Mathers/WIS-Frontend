import type { ITask } from "@/api/admin/types";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal/Modal";
import { createTask, updateTask, deleteTask } from "@/api/admin";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  errorNotification,
  successNotification,
} from "@/utils/notification/notification";

interface IMissionModal {
  isOpen: boolean;
  onClose: () => void;
  task?: ITask | null;
}

const MissionModal = ({ isOpen, onClose, task }: IMissionModal) => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE">("TODO");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
    } else {
      setTitle("");
      setStatus("TODO");
    }
  }, [task, isOpen]);

  const handleSuccess = (msg: string) => {
    queryClient.invalidateQueries({ queryKey: ["stats"] });
    successNotification(msg);
    onClose();
  };

  const saveMutation = useMutation({
    mutationFn: () => {
      return task
        ? updateTask(task.id, { title, status })
        : createTask({ title });
    },
    onSuccess: () =>
      handleSuccess(task ? "Mission updated!" : "Mission created!"),
    onError: () => errorNotification("Action failed"),
  });

  const deleteTaskMutation = useMutation({
    mutationFn: () => deleteTask(task!.id),
    onSuccess: () => handleSuccess("Mission deleted!"),
    onError: () => errorNotification("Error"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate();
  };

  const isWorking = saveMutation.isPending || deleteTaskMutation.isPending;

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
          <button
            type="submit"
            className="comic-btn yellow"
            disabled={isWorking}
          >
            {saveMutation.isPending ? "SAVING..." : "SAVE MISSION"}
          </button>

          {task && (
            <button
              type="button"
              className="comic-btn red"
              onClick={() => deleteTaskMutation.mutate()}
              disabled={isWorking}
            >
              {deleteTaskMutation.isPending ? "DELETING..." : "DELETE"}
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default MissionModal;
