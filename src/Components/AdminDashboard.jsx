import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminPass = prompt('Enter admin password to view dashboard');
    if (!adminPass) {
      setError('Admin password required');
      return;
    }

    axios.get('/agrigrowbe/api/admin/users/unsecured', {
      headers: { 'X-Admin-Password': adminPass }
    })
      .then(res => setUsers(res.data))
      .catch(err => {
        console.error('Admin fetch error', err);
        setError(err.response?.status === 401 ? 'Unauthorized - incorrect admin password' : (err.response?.data?.message || 'Failed to fetch users'));
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <>
          <p>Total Users: {users.length}</p>
          <p>Active: {users.filter(u => u.active).length} | Inactive: {users.filter(u => !u.active).length}</p>
          <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Active</th>
                <th>Logins</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.active ? 'Active' : 'Inactive'}</td>
                  <td>{user.loginCount ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
