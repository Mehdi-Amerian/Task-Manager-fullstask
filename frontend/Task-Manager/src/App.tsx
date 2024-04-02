
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainView from './views/MainView';
import TasksView from './views/TasksView';
import ActivitiesView from './views/ActivitiesView';
import StatisticsView from './views/StatisticsView';
import EditForm from './components/EditForm';
import AddForm from './components/AddForm';
import Layout from './views/Layout';
import { Task } from './types';
import DashboardView from './views/DashboardView';
import ErrorPage from './ErrorPage';


const handleAddTask = (task: Task) => {
  console.log('Adding task:', task);
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/tasks" element={<TasksView />} />
          <Route path="/activities" element={<ActivitiesView />} />
          <Route path="/statistics" element={<StatisticsView />} />
          <Route path="/tasks/:id/edit" element={<EditForm />} />
          <Route path="/tasks/new" element={<AddForm onAddTask={handleAddTask} task={false} />} />
          <Route path="/activities/new" element={<AddForm onAddTask={handleAddTask} task={true} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;