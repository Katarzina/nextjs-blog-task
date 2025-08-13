import { Hero } from '@/components/Hero/Hero';
import { PostList } from '@/components/PostList/PostList';
import { fetchPosts } from '@/lib/api';

export const revalidate = 60; 

export default async function Home() {
  const posts = await fetchPosts();

  return (
    <>
      <Hero 
        title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        backgroundImage="/image.png"
      />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Nejnovější</h2>
        {posts.length > 0 ? (
          <PostList posts={posts} />
        ) : (
          <p className="text-gray-500 text-center py-8">Zatím nejsou k dispozici žádné příspěvky.</p>
        )}
      </div>
    </>
  );
}