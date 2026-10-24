'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Admin() {
  const [pass, setPass] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [users, setUsers] = useState([]);

  // ইউজার ফেচ করার ফাংশন
  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/get-users');
      const text = await res.text();
      if (!text) return;
      const data = JSON.parse(text);
      
      // ডেটা যদি data.data অ্যারে হয় অথবা সরাসরি অ্যারে হয়
      if (data && data.data) {
        setUsers(data.data);
      } else if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    if (pass === '123') {
      setIsLogin(true);
      fetchUsers();
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  // লগইন হওয়ার পর অটোমেটিক ইউজার লোড করার জন্য
  useEffect(() => {
    if (isLogin) {
      fetchUsers();
    }
  }, [isLogin]);

  const handleDelete = async (id) => {
    if (confirm('আপনি কি এই ইউজারকে ডিলিট করতে চান?')) {
      const res = await fetch(`/api/delete-user?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers();
      } else {
        alert('ডিলিট করতে সমস্যা হয়েছে!');
      }
    }
  };

  if (!isLogin) {
    return (
      <form onSubmit={login} className="p-8 max-w-sm mx-auto bg-white rounded-xl shadow-md mt-10 border">
        <h2 className="text-xl font-bold mb-4 text-slate-800 text-center">অ্যাডমিন লগইন</h2>
        <input 
          type="password" 
          placeholder="পাসওয়ার্ড দিন (123)" 
          value={pass}
          onChange={(e) => setPass(e.target.value)} 
          className="border p-2.5 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2.5 rounded w-full font-medium hover:bg-blue-700 transition">লগইন</button>
      </form>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">ইউজার তালিকা ও অ্যাডমিন প্যানেল</h2>
        <button 
          onClick={fetchUsers} 
          className="bg-emerald-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-emerald-700 transition">
          রিফ্রেশ লিস্ট
        </button>
      </div>

      {users.length === 0 ? (
        <p className="text-slate-500">কোনো ইউজার পাওয়া যায়নি বা ডেটা লোড হচ্ছে...</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {users.map(u => (
            <li key={u.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
              <div>
                <p className="font-semibold text-slate-800">{u.name}</p>
                <p className="text-sm text-slate-500">{u.email}</p>
              </div>
              <div className="flex gap-2">
                <Link 
                  href={`/users/${u.id}`} 
                  className="bg-blue-500 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-600 transition">
                  View
                </Link>
                <Link 
                  href={`/users/${u.id}/edit`} 
                  className="bg-amber-500 text-white px-3 py-1.5 rounded text-sm hover:bg-amber-600 transition">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(u.id)} 
                  className="bg-red-500 text-white px-3 py-1.5 rounded text-sm hover:bg-red-600 transition">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}