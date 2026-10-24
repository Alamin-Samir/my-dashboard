import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const db = await mysql.createConnection({ 
  host: '127.0.0.1', 
  port: 3306, // <-- এই পোর্টটি যোগ করে দিন
  user: 'root', 
  password: '', // পাসওয়ার্ড না থাকলে ফাঁকা রাখুন
  database: 'api' 
});
    // ডেটাবেজে নতুন ইউজার ইনসার্ট করা
    await db.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    await db.end();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}