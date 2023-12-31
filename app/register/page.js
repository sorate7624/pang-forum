'use client';

import { useEffect, useState } from 'react';
import RegisterStyles from '../../styles/register.module.scss';
import 'animate.css';
import BackBtn from '../BackBtn';

export default function Register() {
  const [selectedRole, setSelectedRole] = useState('');
  const namePattern = '[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]*';
  const emailPattern = '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$';
  const passwordPattern =
    '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[~!@#$%^&*()_+])[a-zA-Z0-9~!@#$%^&*()_+]{8,}$';

  useEffect(() => {
    setSelectedRole('user');
  }, []);

  return (
    <main className={RegisterStyles['wrapper']}>
      <div className={RegisterStyles['inner']}>
        <div className={RegisterStyles['top-area']}>
          <BackBtn link="/" />
          <h3 className={RegisterStyles['title']}>Register</h3>
        </div>
        <form
          method="POST"
          action="/api/auth/signup"
          className="animate__animated animate__fadeIn"
        >
          <input
            name="name"
            type="text"
            placeholder="name"
            required
            pattern={namePattern}
            className={RegisterStyles['input-text']}
            maxLength={50}
          />
          <input
            name="email"
            type="email"
            placeholder="email"
            required
            pattern={emailPattern}
            className={RegisterStyles['input-text']}
            maxLength={50}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            required
            pattern={passwordPattern}
            className={RegisterStyles['input-text']}
            maxLength={50}
          />
          <div className={RegisterStyles['role-area']}>
            <label className={RegisterStyles['label-radio']}>
              <input
                type="radio"
                name="role"
                defaultValue="user"
                checked={selectedRole === 'user'}
                onChange={(event) => {
                  setSelectedRole(event.target.value);
                }}
              />
              <span>User</span>
            </label>
            <label className={RegisterStyles['label-radio']}>
              <input
                type="radio"
                name="role"
                defaultValue="admin"
                checked={selectedRole === 'admin'}
                onChange={(event) => {
                  setSelectedRole(event.target.value);
                }}
              />
              <span>Admin</span>
            </label>
          </div>
          <button type="submit" className={RegisterStyles['submit-btn']}>
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
