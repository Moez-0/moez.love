import { useState, useEffect } from 'react';
import { Post } from '../types';
import { supabase } from '../supabase';
import Modal from '../components/Modal';
import { motion } from 'motion/react';

export default function Moments() {
  const [moments, setMoments] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchMoments = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('type', 'moment')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setMoments(data.map((p: any) => ({
            id: p.id,
            type: p.type,
            content: p.content,
            image: p.image
          })));
        }
      } catch (err) {
        console.error('Error fetching moments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMoments();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="pixel-panel mb-16 inline-block bg-surface px-6 py-4 text-4xl font-bold">
        Moments
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="pixel-panel aspect-square animate-pulse bg-surface" />
          ))
        ) : (
          moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="pixel-panel group relative aspect-square cursor-pointer overflow-hidden bg-surface"
              onClick={() => setSelectedImage(moment.image!)}
            >
              <img
                src={moment.image}
                alt={moment.content}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-bg/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em]">
                  {moment.content}
                </p>
              </div>
            </motion.div>
          ))
        )}
        {!loading && moments.length === 0 && (
          <div className="col-span-full">
            <p className="pixel-panel bg-surface p-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">No moments archived yet.</p>
          </div>
        )}
      </div>

      <Modal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)}>
        {selectedImage && (
          <img 
            src={selectedImage} 
            alt="Moment" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        )}
      </Modal>
    </div>
  );
}
