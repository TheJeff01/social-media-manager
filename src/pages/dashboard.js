// src/pages/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setUser(JSON.parse(userData));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.push('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      <div>
        <div>
          <h2>User Information</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>User ID:</strong> {user?.id}</p>
        </div>
        
        <div>
          <h2>Dashboard Features</h2>
          <div>
            <div>
              <h3>Profile</h3>
              <p>Manage your personal information</p>
            </div>
            <div>
              <h3>Settings</h3>
              <p>Configure your preferences</p>
            </div>
            <div>
              <h3>Analytics</h3>
              <p>View your activity statistics</p>
            </div>
            <div>
              <h3>Support</h3>
              <p>Get help when you need it</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
