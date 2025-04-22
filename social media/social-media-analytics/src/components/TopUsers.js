// src/components/TopUsers.js
import React, { useState, useEffect } from 'react';

const TopUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Mock data (replace this with your actual API call)
    const mockUsers = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
      { id: 3, name: 'Alice Smith' },
    ];
    setUsers(mockUsers);
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
