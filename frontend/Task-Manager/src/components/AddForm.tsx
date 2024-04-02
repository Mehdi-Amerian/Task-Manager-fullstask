import React, { useState,  useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Task } from '../types';
import TaskList from './TaskList';



interface Props {
  onAddTask: (task: Task) => void;
}

const AddForm: React.FC<Props> = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [activityId, setActivityId] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);

   // Function to fetch tasks from the backend
   const fetchTasks = async () => {
    try {
      const response = await axios.get<Task[]>('http://localhost:3000/api/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

 // Fetch tasks when the component mounts
   useEffect(() => {
   fetchTasks();
}, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<Task>('http://localhost:3000/api/tasks/', {
        
        name,
        content,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
        tags,
        status,
        activityId,
      });

      const task = response.data;
      onAddTask(task);

      // Reset form fields
      setName('');
      setContent('');
      setStartDate(null);
      setEndDate(null);
      setTags([]);
      setStatus('');
      setActivityId(0);
      // Refetch tasks after adding a new task
      fetchTasks();

    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error (e.g., network error, server error)
        console.error('Axios error:', (error as AxiosError).response?.data || error.message);
      } else {
        // Handle other types of errors
        console.error('Unknown error:', error);
      }
    }
  };

  return (
    <div>
    <TaskList tasks={tasks} onEdit={() => {}} onDelete={() => {}} /> {/* Render the TaskList component */}
    <form onSubmit={handleSubmit}>
      <h2>Add Task</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label htmlFor="content">Content:</label>
      <textarea
        id="content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
      />
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
       value={startDate ? startDate.toISOString().split('T')[0] : ''}
       onChange={(event) => setStartDate(new Date(event.target.value))}
        

      />
      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
       value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onChange={(event) => setEndDate(new Date(event.target.value))}
      />
      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        id="tags"
        value={tags.join(', ')}
       onChange={(event) => setTags(event.target.value.split(',').map(tag => tag.trim()).filter(tag => tag !== ''))}

      />
      <label htmlFor="status">Status:</label>
      <input
        type="text"
        id="status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      />
      <label htmlFor="activityId">Activity ID:</label>
      <input
        type="number"
        id="activityId"
        value={activityId}
        onChange={(event) => setActivityId(parseInt(event.target.value))}

      />
      <button className="btn btn-primary mb-3" type="submit">Add Task</button>
    </form>
    </div>
  );
};

export default AddForm;

