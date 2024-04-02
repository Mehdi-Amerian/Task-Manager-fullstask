import React from 'react';

interface DashboardProps {}

interface DashboardState {
  tasks: { id: number; text: string }[];
  performanceData: { day: string; value: number }[];
  notifications: { id: number; message: string }[];
}

class DashboardView extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);

    this.state = {
      tasks: [
        { id: 1, text: 'Task 1' },
        { id: 2, text: 'Task 2' },
      ],
      performanceData: [
        { day: 'Monday', value: 80 },
        { day: 'Tuesday', value: 90 },
      ],
      notifications: [
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
      ],
    };
  }

  componentDidMount() {
    // Fetch data here
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <h2>Current Tasks</h2>
          {this.state.tasks.map((task) => (
            <div key={task.id}>{task.text}</div>
          ))}
        </div>
        <div>
          <h2>Weekly Performance</h2>
          <table>
            <thead>
              <tr>
                <th>Day</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {this.state.performanceData.map((data) => (
                <tr key={data.day}>
                  <td>{data.day}</td>
                  <td>{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Notifications</h2>
          <ul>
            {this.state.notifications.map((notification) => (
              <li key={notification.id}>{notification.message}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default DashboardView;