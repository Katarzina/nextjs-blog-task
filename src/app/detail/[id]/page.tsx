import { notFound } from 'next/navigation';
import { Hero } from '@/components/Hero/Hero';
import { fetchPostDetail } from '@/lib/api';

// Disable caching for detail pages to avoid stale 404s
export const dynamic = 'force-dynamic';

interface DetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailPage({ params }: DetailPageProps) {
  const resolvedParams = await params;
  
  const postId = parseInt(resolvedParams.id);
  
  if (isNaN(postId)) {
    console.error(`[DetailPage] Invalid postId: ${resolvedParams.id}`);
    notFound();
  }

  const post = await fetchPostDetail(postId);

  if (!post) {
    console.error(`[DetailPage] Post not found for ID:`, postId);
    notFound();
  }

  // Divide the content into paragraphs
  const paragraphs = post.content.split('\r\n\r\n').filter(p => p.trim());

  return (
    <>
      <Hero 
        title={post.title}
        backgroundImage="/image.png"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <p className="text-xs font-bold" style={{ color: 'var(--heading-color)'}}>{post.author}</p>
            </div>
          </div>
          
          <div className="lg:col-span-11">
            <div className="space-y-3">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-base leading-relaxed" style={{ color: 'var(--heading-color)'}}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}