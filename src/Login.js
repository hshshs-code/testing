import React, { useState } from 'react';

function Login({ onLogin }) {
  const [role, setRole] = useState('Student');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Select Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Doctor">Doctor</option>
            <option value="Manager">Manager</option>
          </select>
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
