import { useState } from 'react';
import './App.css';
import Login from './Login';
import StudentDashboard from './StudentDashboard';
import DoctorDashboard from './DoctorDashboard';
import ManagerDashboard from './ManagerDashboard';

function App() {
  const [role, setRole] = useState(null);

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
  };

  const handleLogout = () => {
    setRole(null);
  };

  let content;
  if (!role) {
    content = <Login onLogin={handleLogin} />;
  } else if (role === 'Student') {
    content = <StudentDashboard onLogout={handleLogout} />;
  } else if (role === 'Doctor') {
    content = <DoctorDashboard onLogout={handleLogout} />;
  } else if (role === 'Manager') {
    content = <ManagerDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
