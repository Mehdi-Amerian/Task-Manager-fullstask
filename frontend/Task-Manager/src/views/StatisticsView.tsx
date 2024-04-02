import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface StatisticsData {
  totalTasks: number;
  completedTasks: number;
  totalActivities: number;
  completedActivities: number;
}

const StatisticsView: React.FC = () => {
  const [statistics, setStatistics] = useState<StatisticsData>({
    totalTasks: 0,
    completedTasks: 0,
    totalActivities: 0,
    completedActivities: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const tasksResponse = await axios.get('/tasks/statistics');
      const activitiesResponse = await axios.get('/activities/statistics');

      setStatistics({
        totalTasks: tasksResponse.data.total,
        completedTasks: tasksResponse.data.completed,
        totalActivities: activitiesResponse.data.total,
        completedActivities: activitiesResponse.data.completed,
      });
    };

    fetchStatistics();
  }, []);

  return (
    <div>
      <h1>Statistics</h1>
      <h2>Tasks</h2>
      <p>Total: {statistics.totalTasks}</p>
      <p>Completed: {statistics.completedTasks}</p>
      <h2>Activities</h2><p>Total: {statistics.totalActivities}</p>
      <p>Completed: {statistics.completedActivities}</p>
    </div>
  );
};

export default StatisticsView;