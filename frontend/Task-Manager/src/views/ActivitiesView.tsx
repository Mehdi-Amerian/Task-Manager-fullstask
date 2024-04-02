import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Activity {
  id: number;
  name: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  status: string;
  activityType: string;
  tags: string[];
}

const ActivitiesView: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/activities');
        if (Array.isArray(response.data)) {
          setActivities(response.data);
        } else {
          console.error('Invalid response data:', response.data);
          // Handle the error (e.g., show an error message or retry)
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        // Handle the error (e.g., show an error message or retry)
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      <Link to="/activities/new">Add Activity</Link>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>URL</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Type</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <tr key={activity.id}>
                <td>{activity.name}</td>
                <td>{activity.description}</td>
                <td>{activity.url}</td>
                <td>{activity.startDate}</td>
                <td>{activity.endDate}</td>
                <td>{activity.status}</td>
                <td>{activity.activityType}</td>
                <td>
                  {activity.tags.map((tag) => (
                    <span key={tag}>{tag} </span>
                  ))}
                </td>
                <td>
                  <Link to={`/activities/${activity.id}/edit`}>Edit</Link>
                  <button type="button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9}>No activities found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActivitiesView;
