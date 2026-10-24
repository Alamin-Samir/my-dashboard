'use client';
import { useState, useEffect, use } from 'react';

export default function UserDetail({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/get-user?id=${id}`)
      .then(res => res.json())
      .then(data => setUser(data.data));
  }, [id]);

  if (!user) return <p>লোড হচ্ছে...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>ইউজারের বিস্তারিত তথ্য</h2>
      <p>আইডি: {user.id}</p>
      <p>নাম: {user.name}</p>
      <p>ইমেল: {user.email}</p>
    </div>
  );
}