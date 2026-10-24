import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* লোগো বা প্রজেক্টের নাম */}
      <div className="text-xl font-bold tracking-wide">
        <Link href="/" className="hover:text-blue-400 transition">
          UserManagement
        </Link>
      </div>

      {/* মেনু লিংকসমূহ */}
      <div className="flex gap-6 font-medium">
        <Link 
          href="/" 
          className="hover:text-blue-400 transition py-1 px-3 rounded-md hover:bg-slate-800">
          হোম / রেজিস্ট্রেশন
        </Link>
        <Link 
          href="/admin" 
          className="hover:text-blue-400 transition py-1 px-3 rounded-md hover:bg-slate-800">
          অ্যাডমিন প্যানেল
        </Link>
      </div>
    </nav>
  );
}