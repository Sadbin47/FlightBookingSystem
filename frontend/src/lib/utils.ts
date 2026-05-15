export function formatDateTime(value: string | Date) {
  const date = new Date(value);
  return date.toLocaleString();
}

export function parseApiError(error: unknown): string {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof error.response === 'object' &&
    error.response !== null &&
    'data' in error.response
  ) {
    const data = error.response.data as { message?: string | string[] };
    if (Array.isArray(data.message)) return data.message.join(', ');
    if (typeof data.message === 'string') return data.message;
  }
  return 'Something went wrong';
}
