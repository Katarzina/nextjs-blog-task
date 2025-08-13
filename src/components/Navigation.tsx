'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  const navItems = [
    { href: '/', label: 'Blog' },
    { href: '/new', label: 'Přidat článek' }
  ];
  
  return (
    <header className="absolute top-0 left-0 right-0 z-50" style={{ backgroundColor: 'var(--color-black-20)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Hlavní navigace">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center" aria-label="Q2 Blog - Domovská stránka">
            <Image 
              src="/q2-logo-b-l-1.png" 
              alt="Q2 Logo" 
              width={81} 
              height={54}
              className="object-contain"
            />
          </Link>
          <div className="flex items-center space-x-16">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`
                  relative text-white hover:text-gray-200 font-medium text-sm pb-1
                  after:content-[''] after:absolute after:-bottom-1 after:left-0 
                  after:h-[2px] after:transition-all after:duration-300
                  after:bg-[var(--color-accent)]
                  ${pathname === item.href ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}