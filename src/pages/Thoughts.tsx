import { useState, useEffect } from 'react';
import { Post } from '../types';
import { supabase } from '../supabase';
import FeedPostCard from '../components/FeedPostCard';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Thoughts() {
  const [thoughts, setThoughts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .in('type', ['thought', 'article', 'quote', 'video'])
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setThoughts(data.map((p: any) => ({
            id: p.id,
            type: p.type,
            title: p.title,
            content: p.content,
            author: p.author,
            videoId: p.video_id,
            url: p.url
          })));
        }
      } catch (err) {
        console.error('Error fetching thoughts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchThoughts();
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <header className="mb-12 border-b border-border/80 pb-7">
        <p className="mb-2 text-xs tracking-[0.2em] text-text-secondary">COLUMN</p>
        <h2 className="text-4xl md:text-5xl">Thoughts</h2>
      </header>
      
      <div className="space-y-12">
        {loading ? (
          <div className="space-y-12">
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          thoughts.map((thought) => (
            <FeedPostCard key={thought.id} post={thought} />
          ))
        )}
        {!loading && thoughts.length === 0 && (
          <p className="pixel-panel bg-surface p-6 text-center text-xs tracking-[0.16em] text-text-secondary">No thoughts archived yet.</p>
        )}
      </div>
    </div>
  );
}
