import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Task {
  id: number;
  name: string;
  content: string;
  startDate: string;
  endDate: string;
  status: string;
  activityId: number;
}

const TasksView: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tasks/');
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } 
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  return (
    <div className="container">
      <h1 className="my-3">Tasks</h1>
      <Link className="btn btn-primary mb-3" to="/tasks/new">Add Task</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Content</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.content}</td>
                <td>{task.startDate}</td>
                <td>{task.endDate}</td>
                <td>{task.status}</td>
                <td>
                  <Link to={`/activities/${task.activityId}`}>
                    {task.activityId}
                  </Link>
                </td>
                <td>
                  <button className="btn btn-warning mr-2"><Link to={`/tasks/${task.id}/edit`}>Edit</Link></button>
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No tasks found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksView;
