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
    <div className="max-w-2xl mx-auto py-12 px-4">
      <header className="mb-12 pixel-panel p-6 bg-surface">
       
        <p className="mb-3 text-xs font-mono uppercase tracking-[0.2em] text-text-secondary">
          Moez Souidi's Portal
        </p>
        <p className="max-w-md text-base text-text-secondary">
          Archive of articles, videos, music, thoughts, and moments.
        </p>
      </header>

      <div className="space-y-8">
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
