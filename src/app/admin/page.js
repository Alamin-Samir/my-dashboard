'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch('/api/get-users');
    const data = await res.json();
    if (data && data.data) setUsers(data.data);
  };

  useEffect(() => { if (isLogin) fetchUsers(); }, [isLogin]);

  const handleDelete = async (id) => {
    if (confirm('ডিলিট করবেন?')) {
      await fetch(`/api/delete-user?id=${id}`, { method: 'DELETE' });
      fetchUsers();
    }
  };

  if (!isLogin) {
    return (
      <div style={{ padding: '20px' }}>
        <h3>অ্যাডমিন লগইন (পাসওয়ার্ড: 123)</h3>
        <input type="password" onChange={e => setPass(e.target.value)} placeholder="পাসওয়ার্ড দিন" />
        <button onClick={() => pass === '123' ? setIsLogin(true) : alert('ভুল পাসওয়ার্ড')}>লগইন</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>ইউজার লিস্ট</h2>
      <ul>
        {users.map(u => (
          <li key={u.id} style={{ margin: '10px 0' }}>
            {u.name} ({u.email}) &nbsp;
            <Link href={`/users/${u.id}`}>View</Link> | &nbsp;
            <Link href={`/users/${u.id}/edit`}>Edit</Link> | &nbsp;
            <button onClick={() => handleDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}