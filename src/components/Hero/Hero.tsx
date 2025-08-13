'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { HeroProps } from '@/types';

export const Hero = memo<HeroProps>(({ 
  title, 
  backgroundImage = '/image.png',
  className = '' 
}) => {
  return (
    <section 
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: '600px' }}
    >
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        quality={75}
        className="object-cover"
        style={{ objectPosition: 'center' }}
      />
      <div className="relative h-full max-w-7xl mx-auto flex items-center z-10">
        <h1 
          className="text-white font-bold"
          style={{
            fontSize: '36px',
            lineHeight: 'normal',
            maxWidth: '530px',
            marginLeft: '70px'
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';