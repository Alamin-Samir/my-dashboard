'use client';
import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMsg('সফলভাবে রেজিস্ট্রেশন হয়েছে!');
      setForm({ name: '', email: '', password: '' });
    } else {
      setMsg('সমস্যা হয়েছে!');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>রেজিস্ট্রেশন ফর্ম</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
        <input type="text" placeholder="নাম" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
        <input type="email" placeholder="ইমেল" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="পাসওয়ার্ড" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
        <button type="submit">সাবমিট</button>
      </form>
    </div>
  );
}