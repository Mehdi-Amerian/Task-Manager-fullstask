import React from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types';
import { useState } from 'react';

interface Props {
  tasks: Task[];
  onEdit: (id: number, updatedTask: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<Props> = ({ tasks, onEdit }) => {
  const [taskList, setTaskList] = useState<Task[]>(tasks);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };


  
  return (
    <ul>
      {Array.isArray(tasks) && tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={() => deleteTask(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;