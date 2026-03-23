import { useState, useEffect } from 'react';
import { Post } from '../types';
import { supabase } from '../supabase';
import { motion } from 'motion/react';

export default function Quotes() {
  const [quotes, setQuotes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('type', 'quote')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setQuotes(data.map((p: any) => ({
            id: p.id,
            type: p.type,
            content: p.content,
            author: p.author
          })));
        }
      } catch (err) {
        console.error('Error fetching quotes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold tracking-tighter mb-16 border-b border-border pb-4">
        Quotes
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border p-12 min-h-[300px] animate-pulse" />
          ))
        ) : (
          quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-surface border border-border p-12 flex flex-col justify-center items-center text-center hover:border-accent transition-colors duration-500 min-h-[300px]"
            >
              <p className="text-xl font-serif italic leading-relaxed mb-8">
                "{quote.content}"
              </p>
              {quote.author && (
                <span className="text-xs font-mono uppercase tracking-widest text-text-secondary">
                  — {quote.author}
                </span>
              )}
            </motion.div>
          ))
        )}
        {!loading && quotes.length === 0 && (
          <div className="col-span-full">
            <p className="text-text-secondary font-mono text-center">No quotes archived yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
