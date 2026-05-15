'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { api } from '@/lib/api';
import { Flight } from '@/types/flight';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { parseApiError } from '@/lib/utils';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

interface FormData {
  passengers: { name: string; age: number; passportNumber: string }[];
}

export default function BookFlightPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register, control, handleSubmit } = useForm<FormData>({
    defaultValues: { passengers: [{ name: '', age: 1, passportNumber: '' }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'passengers' });

  useEffect(() => {
    void (async () => {
      const { data } = await api.get(`/flights/${params.id}`);
      setFlight(data);
    })();
  }, [params.id]);

  async function onSubmit(values: FormData) {
    try {
      setError('');
      setSuccess('');
      await api.post('/bookings', {
        flightId: Number(params.id),
        passengers: values.passengers.map((p) => ({ ...p, age: Number(p.age) })),
      });
      setSuccess('Booking created successfully.');
      router.push('/customer/bookings');
    } catch (e) {
      setError(parseApiError(e));
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Book Flight</h1>
      {flight && (
        <div className="rounded border bg-white p-3">
          <p className="font-semibold">{flight.flightNumber}</p>
          <p>
            {flight.origin} → {flight.destination}
          </p>
        </div>
      )}
      <ErrorMessage message={error} />
      {success && <p className="rounded bg-green-100 p-2 text-sm text-green-700">{success}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 rounded border bg-white p-4">
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-2 md:grid-cols-4">
            <Input placeholder="Name" {...register(`passengers.${index}.name`)} />
            <Input type="number" min={1} placeholder="Age" {...register(`passengers.${index}.age`, { valueAsNumber: true })} />
            <Input placeholder="Passport Number" {...register(`passengers.${index}.passportNumber`)} />
            <Button type="button" className="bg-red-600" onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <div className="flex gap-2">
          <Button type="button" onClick={() => append({ name: '', age: 1, passportNumber: '' })}>
            Add Passenger
          </Button>
          <Button type="submit">Confirm Booking</Button>
        </div>
      </form>
    </div>
  );
}
