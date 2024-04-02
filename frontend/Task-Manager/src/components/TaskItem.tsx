import React, { useState } from 'react';
import moment from 'moment';
import EditTaskForm from './EditForm';
import { Task } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';



interface Props {
  task: Task;
  onEdit: (id: number, updatedTask: Task) => void;
  onDelete: () => void ;
}


const TaskItem: React.FC<Props> = ({ task, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
 
  const handleEdit = () => { 
    setIsEditing(true); 
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };



  const handleSave = (updatedTask: Task) => {
    const taskToSave: Task = {
      ...task,
      ...updatedTask,
      startDate: updatedTask.startDate || task.startDate,
      endDate: updatedTask.endDate || task.endDate,
    };
    console.log('handleSave:', updatedTask)

    onEdit(task.id, taskToSave);
    setIsEditing(false);
    console.log('Updated task:', taskToSave);
  };

  const handleClick = () => {
    onEdit(task.id, task);
  };
 
  return (
    <div className="card mb-3">
      {isEditing ? (
        <EditTaskForm
          task={task}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <div className="card-header">
            <h2 className="card-title">{task.name}</h2>
          </div>
          <div className="card-body">
            <p className="card-text">{task.content}</p>
            <p>Start date: {moment(task.startDate).format('YYYY-MM-DD')}</p>
            <p>End date: {moment(task.endDate).format('YYYY-MM-DD')}</p>
            <p>Tags: {Array.isArray(task.tags) ? task.tags.join(', ') : ''}</p>
            <p>Status: {task.status}</p>
            <p>Activity ID: {task.activityId}</p>
          </div>
          <div className="card-footer">
          <button className="btn btn-warning mr-2"><Link to={`/tasks/${task.id}/edit`}>Edit</Link></button>
            &nbsp;
            <button className="btn btn-success mr-2" type="button" onClick={handleClick}>Complete</button>
            &nbsp;
            <button className="btn btn-danger" type="button" onClick={() => handleDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
      };

export default TaskItem;