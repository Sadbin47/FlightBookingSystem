'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { useAuth } from '@/hooks/useAuth';

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get('/customer/booking');
      setTotalBookings(data.length);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Welcome, {user?.fullName}</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <p className="text-sm text-slate-500">Total Bookings</p>
          <p className="text-3xl font-bold">{totalBookings}</p>
        </div>
      </div>
      <div className="flex gap-4">
        <Link href="/customer/flights" className="text-blue-600">
          Search Flights
        </Link>
        <Link href="/customer/bookings" className="text-blue-600">
          My Bookings
        </Link>
      </div>
    </div>
  );
}
