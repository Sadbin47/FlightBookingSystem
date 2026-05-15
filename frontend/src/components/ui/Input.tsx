'use client';

import { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full rounded border border-slate-300 bg-white px-3 py-2 outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
}
