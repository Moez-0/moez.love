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
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h2 className="pixel-panel mb-16 inline-block bg-surface px-6 py-4 text-4xl font-bold">
        Thoughts
      </h2>
      
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
          <p className="pixel-panel bg-surface p-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">No thoughts archived yet.</p>
        )}
      </div>
    </div>
  );
}
