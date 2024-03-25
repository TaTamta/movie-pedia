import React, { useContext, useState } from 'react';
import Input from '../../components/forrm-elements/Input/Input';
import Button from '../../components/forrm-elements/Button/Button';
import styles from './Authorization.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

export default function AuthorizationPage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    if (username === 'user' && password === 'password') {
      const token = 'dummy_token';
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      context?.setUser(username);
      context?.setIsLoggedIn(true);
      navigate('/home');
    } else {
      setError('Invalid username or password');
    }
  }

  if (context?.isLoggedIn) {
    return <Navigate to="/home" />;
  }
  return (
    <div className={styles.authorization}>
      <div className={styles.authorizationContainer}>
        <h2>Login</h2>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="primary" text="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}
