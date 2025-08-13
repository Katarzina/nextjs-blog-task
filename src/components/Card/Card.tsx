'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PostProps} from '@/types';

export const Card = memo<PostProps>(({
  id,
  title,
  author,
  content,
  image,
  className = '',
}) => {
  return (
    <Link href={`/detail/${id}`} className={`block group ${className}`} aria-label={`Přečíst článek: ${title}`}>
      <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-xl hover:scale-[1.05] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full flex flex-col border border-transparent hover:border-gray-200" role="article" aria-labelledby={`card-title-${id}`}>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <div className="w-full h-48 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center overflow-hidden">    
              {image ? (
                <Image 
                  src={image} 
                  alt={title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <p className="text-xs" style={{ color: 'var(--card-color)'}}>
            {author}
          </p>
          <h3 id={`card-title-${id}`} className="text-lg font-bold line-clamp-2 flex-1" style={{ color: 'var(--heading-color)'}}>
            {title}
          </h3>
          <p className="text-xs line-clamp-3 h-12" style={{ color: 'var(--card-color)'}}>
            {content}
          </p>
        </div>
      </article>
    </Link>
  );
});

Card.displayName = 'Card';