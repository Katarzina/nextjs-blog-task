import { Hero } from '@/components/Hero/Hero';
import { PostForm } from '@/components/PostForm/PostForm';

export default function NewArticlePage() {
  return (
    <>
      <Hero 
        title="Přidání článku"
        backgroundImage="/image.png"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" style={{ backgroundColor: 'var(--color-bg-gray)' }}>
        <div className="flex justify-center">
          <PostForm />
        </div>
      </div>
    </>
  );
}