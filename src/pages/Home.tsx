import { useState, useEffect } from 'react';
import { Post } from '../types';
import FeedPostCard from '../components/FeedPostCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Modal from '../components/Modal';
import { supabase } from '../supabase';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const PAGE_SIZE = 10;

  const fetchPosts = async (pageNumber: number) => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .in('type', ['thought', 'quote', 'music', 'moment', 'article', 'video'])
        .order('created_at', { ascending: false })
        .range(pageNumber * PAGE_SIZE, (pageNumber + 1) * PAGE_SIZE - 1);

      if (error) throw error;

      if (data) {
        // Map snake_case to camelCase if necessary, but I'll try to keep them consistent in SQL
        const formattedPosts: Post[] = data.map((p: any) => ({
          id: p.id,
          type: p.type,
          title: p.title,
          content: p.content,
          author: p.author,
          image: p.image,
          spotifyId: p.spotify_id,
          artist: p.artist,
          videoId: p.video_id,
          projectUrl: p.project_url,
          projectThumbnail: p.project_thumbnail,
          url: p.url
        }));

        if (pageNumber === 0) {
          setPosts(formattedPosts);
        } else {
          setPosts(prev => [...prev, ...formattedPosts]);
        }
        
        if (data.length < PAGE_SIZE) {
          setHasMore(false);
        }
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setLoading(true);
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore, page]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="mb-10 border-b border-border/80 pb-8 md:mb-12">
        <p className="mb-3 text-xs tracking-[0.2em] text-text-secondary">MOEZ SOUIDI'S PORTAL</p>
        <h1 className="max-w-3xl text-4xl leading-[1.08] md:text-6xl">Stuff i get excited about.</h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary md:text-lg">
          Thoughts,projects,music,videos,moments.
        </p>
      </header>

      <div className="space-y-10">
        {posts.map((post) => (
          <FeedPostCard 
            key={post.id} 
            post={post} 
            onClickImage={setSelectedImage}
          />
        ))}
        
        {loading && (
          <>
            <SkeletonLoader />
            <SkeletonLoader />
          </>
        )}
      </div>

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        )}
      </Modal>
    </div>
  );
}
