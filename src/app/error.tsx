'use client';

import { useEffect } from 'react';
import { useNotification } from '@/contexts/NotificationContext';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { showError } = useNotification();

  useEffect(() => {
    showError(error.message || 'Došlo k neočekávané chybě');
  }, [error, showError]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="text-center p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Chyba aplikace</h1>
            <p className="text-gray-600 mb-6">Omlouváme se, ale došlo k neočekávané chybě.</p>
            <button
              onClick={reset}
              className="px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Obnovit aplikaci
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}