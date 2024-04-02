import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskModel } from '../models/taskModels';
import { getTaskByIdDB, updateTaskDB } from '../services/taskApi';
import moment from "moment";

const getTask = async (taskId: string) => {
  return await getTaskByIdDB(taskId);
};

export default function EditForm() {
  const { taskId } = useParams();

  const [task, setTask] = useState<TaskModel>({} as TaskModel);


  useEffect(() => {
    if (taskId) {
      getTask(taskId).then((selectedTask: TaskModel) => {
        if (selectedTask) {
          console.log("Selected task:", selectedTask);
          setTask(selectedTask);
        }
      });
    }
  }, [taskId]);
  
  

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevState: TaskModel) => ({
      ...prevState,
      [name]: value,
    }));
  };
  

  const navigate = useNavigate();

  const updateTask = async (e: FormEvent) => {
    e.preventDefault();
    if (await updateTaskDB(task)) {
      navigate(`/tasks/${task.id}`);
      console.log("Task ID:", task.id);
    }
  };

  return (
    <form onSubmit={updateTask}>
      <h2>Edit Task</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={task.name}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={task.content}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={task.startDate ? moment(task.startDate).format('YYYY-MM-DD') : ''}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={task.endDate ? moment(task.endDate).format('YYYY-MM-DD') : ''}
        onChange={(event) => handleChange(event)}
      />
      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        id="tags"
        value={task.tags}
        onChange={(event) => handleChange(event)}
      />
      <button type="submit"> Save Task</button>
      <button type="button" onClick={() => navigate('/tasks')}>Cancel</button>
    </form>
  );
}
