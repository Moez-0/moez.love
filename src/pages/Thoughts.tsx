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
          .in('type', ['thought', 'video', 'article'])
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setThoughts(data.map((p: any) => ({
            id: p.id,
            type: p.type,
            title: p.title,
            content: p.content,
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
      <h2 className="text-3xl font-bold tracking-tighter mb-16 border-b border-border pb-4 uppercase">
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
          <p className="text-text-secondary font-mono text-center uppercase tracking-widest">No thoughts archived yet.</p>
        )}
      </div>
    </div>
  );
}
