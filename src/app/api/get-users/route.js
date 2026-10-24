import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function GET() {
  try {
    const db = await mysql.createConnection({ 
      host: '127.0.0.1', 
      port: 3306,
      user: 'root', 
      password: '', 
      database: 'api' 
    });

    const [rows] = await db.execute('SELECT * FROM users');
    await db.end();

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    // কোনো এরর হলে ব্রাউজারে সেটি সরাসরি প্রিন্ট করবে
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}