'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Booking } from '@/types/booking';
import { api } from '@/lib/api';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { parseApiError } from '@/lib/utils';

export default function CustomerBookingDetailsPage() {
  const params = useParams<{ id: string }>();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await api.get(`/bookings/${params.id}`);
        setBooking(data);
      } catch (e) {
        setError(parseApiError(e));
      }
    })();
  }, [params.id]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Booking Details</h1>
      <ErrorMessage message={error} />
      {booking && (
        <div className="rounded border bg-white p-4">
          <p>Booking ID: {booking.id}</p>
          <p>Customer: {booking.user.fullName} ({booking.user.email})</p>
          <p>Flight: {booking.flight.flightNumber}</p>
          <p>
            Route: {booking.flight.origin} → {booking.flight.destination}
          </p>
          <p>Status: {booking.status}</p>
          <p>Passengers:</p>
          <ul className="list-disc pl-5">
            {booking.passengers.map((p, idx) => (
              <li key={idx}>
                {p.name} - {p.age} - {p.passportNumber}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
