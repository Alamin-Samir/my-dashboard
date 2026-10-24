'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditUser({ params }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const resolvedParams = await params;
      const id = resolvedParams.id;
      const res = await fetch(`/api/get-user?id=${id}`);
      const data = await res.json();
      if (data && data.user) {
        setName(data.user.name);
        setEmail(data.user.email);
      }
    }
    loadUser();
  }, [params]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const resolvedParams = await params;
    const id = resolvedParams.id;

    const res = await fetch('/api/update-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, name, email }),
    });

    if (res.ok) {
      alert('ইউজার সফলভাবে আপডেট হয়েছে!');
      router.push('/admin');
    } else {
      alert('আপডেট করতে সমস্যা হয়েছে!');
    }
  };

  return (
    <main style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <h2>ইউজার তথ্য এডিট করুন</h2>
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px', marginTop: '15px' }}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'green', color: 'white', cursor: 'pointer', border: 'none', borderRadius: '4px' }}>আপডেট করুন</button>
      </form>
    </main>
  );
}