'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Flight } from '@/types/flight';
import { FlightCard } from '@/components/flights/FlightCard';
import { FlightFilters, FlightSearchForm } from '@/components/flights/FlightSearchForm';
import { normalizeArray } from '@/lib/normalize';

export default function CustomerFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>([]);

  async function fetchFlights(filters?: FlightFilters) {
    const { data } = await api.get('/flights', { params: filters });
    setFlights(normalizeArray<Flight>(data));
  }

  useEffect(() => {
    void fetchFlights();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Search Flights</h1>
      <FlightSearchForm onSearch={fetchFlights} />
      <div className="grid gap-3 md:grid-cols-2">
        {flights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            canBook
            bookLink={`/customer/flights/${flight.id}/book`}
          />
        ))}
      </div>
    </div>
  );
}
