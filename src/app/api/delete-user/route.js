import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const db = await mysql.createConnection({ 
      host: '127.0.0.1', 
      port: 3306,
      user: 'root', 
      password: '', 
      database: 'api' 
    });

    // ডেটাবেজ থেকে ইউজার ডিলিট করা
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
    await db.end();

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}