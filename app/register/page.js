'use client';

import { useEffect, useState } from 'react';

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    setSelectedRole('user');
  }, []);

  return (
    <div>
      <form method="POST" action="/api/auth/signup">
        <input name="name" type="text" placeholder="name" />
        <input name="email" type="text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <label>
          <input
            type="radio"
            name="role"
            defaultValue="user"
            checked={selectedRole === 'user'}
            onChange={(event) => {
              setSelectedRole(event.target.value);
            }}
          />
          User
        </label>
        <label>
          <input
            type="radio"
            name="role"
            defaultValue="admin"
            checked={selectedRole === 'admin'}
            onChange={(event) => {
              setSelectedRole(event.target.value);
            }}
          />{' '}
          Admin
        </label>
        <br />
        <button type="submit">id/pw 가입요청</button>
      </form>
    </div>
  );
}
