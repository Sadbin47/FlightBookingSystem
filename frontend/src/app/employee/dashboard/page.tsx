'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function EmployeeDashboardPage() {
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get('/employee/bookings');
      setTotalBookings(data.length);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Employee Dashboard</h1>
      <div className="rounded border bg-white p-4">
        <p className="text-sm text-slate-500">Total Bookings</p>
        <p className="text-3xl font-bold">{totalBookings}</p>
      </div>
      <Link href="/employee/bookings" className="text-blue-600">
        Go to Booking Management
      </Link>
    </div>
  );
}
