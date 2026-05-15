'use client';

import { useEffect, useState } from 'react';
import { Booking } from '@/types/booking';
import { api } from '@/lib/api';
import { BookingTable } from '@/components/bookings/BookingTable';

export default function CustomerBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    void (async () => {
      const { data } = await api.get('/customer/booking');
      setBookings(data);
    })();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <BookingTable bookings={bookings} detailsBasePath="/customer/bookings" />
    </div>
  );
}
