import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function PUT(request) {
  try {
    const { id, name, email } = await request.json();

    const db = await mysql.createConnection({ 
      host: '127.0.0.1', 
      user: 'root', 
      password: '', 
      database: 'api' 
    });

    // ডেটাবেজে ইউজার আপডেট কুয়েরি
    await db.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
    await db.end();

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}