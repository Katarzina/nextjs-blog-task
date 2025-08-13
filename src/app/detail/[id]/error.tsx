'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/contexts/NotificationContext';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { showError } = useNotification();
  const router = useRouter();

  useEffect(() => {
    showError(error.message || 'Chyba při načítání příspěvku');
  }, [error, showError]);

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Něco se pokazilo!</h2>
        <button
          onClick={handleGoHome}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Zpět na hlavní stránku
        </button>
      </div>
    </div>
  );
}