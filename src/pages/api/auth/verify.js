// src/pages/api/auth/verify.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    res.status(200).json({ 
      message: 'Token valid', 
      user: decoded 
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
