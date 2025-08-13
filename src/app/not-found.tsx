import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg-gray)' }}>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--heading-color)' }}>
          Stránka nenalezena
        </h2>
        <p className="text-gray-600 mb-6">
          Omlouváme se, ale požadovaná stránka nebyla nalezena.
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}