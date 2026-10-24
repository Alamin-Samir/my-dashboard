'use client';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে!');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage(data.error || 'রেজিস্ট্রেশন করতে সমস্যা হয়েছে!');
      }
    } catch (err) {
      console.error(err);
      setMessage('সার্ভার কানেকশনে সমস্যা হয়েছে!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border text-black">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">ইউজার রেজিস্ট্রেশন</h2>
        
        {message && (
          <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded text-sm text-center font-medium">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">নাম</label>
            <input 
              type="text" 
              placeholder="আপনার নাম লিখুন" 
              value={name}
              onChange={(e) => setName(e.target.value)} 
              required 
              className="border p-2.5 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ইমেল</label>
            <input 
              type="email" 
              placeholder="আপনার ইমেল লিখুন" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="border p-2.5 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              placeholder="পাসওয়ার্ড দিন" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="border p-2.5 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white p-2.5 rounded font-medium hover:bg-blue-700 transition mt-2">
            রেজিস্ট্রেশন করুন
          </button>
        </form>
      </div>
    </div>
  );
}