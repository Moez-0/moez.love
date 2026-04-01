import { useState, useEffect } from 'react';
import { Post } from '../types';
import { supabase } from '../supabase';
import { Music as MusicIcon } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';

export default function Music() {
  const [tracks, setTracks] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('type', 'music')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) {
          setTracks(data.map((p: any) => ({
            id: p.id,
            type: p.type,
            title: p.title,
            content: p.content,
            spotifyId: p.spotify_id,
            artist: p.artist
          })));
        }
      } catch (err) {
        console.error('Error fetching music:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <h2 className="pixel-panel mb-16 inline-block bg-surface px-6 py-4 text-4xl font-bold">
        Music
      </h2>

      <div className="space-y-16">
        {loading ? (
          <div className="space-y-12">
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          tracks.map((track) => (
            <div key={track.id} className="pixel-panel group bg-surface p-6">
              <div className="flex items-start gap-4 md:gap-6 mb-4">
                <div className="shrink-0 border-2 border-border bg-bg p-3 md:p-4 group-hover:border-text-primary transition-colors">
                  <MusicIcon size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="mb-1 truncate text-2xl font-bold">{track.title}</h3>
                  </div>
                  <p className="truncate text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-text-secondary">
                    {track.artist}
                  </p>
                </div>
              </div>
              
              <div className="md:pl-[76px]">
                <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                  {track.content}
                </p>

                {track.spotifyId && (
                  <div className="overflow-hidden">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '12px' }}
                      src={`https://open.spotify.com/embed/track/${track.spotifyId}?utm_source=generator`}
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="block"
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        {!loading && tracks.length === 0 && (
          <p className="pixel-panel bg-surface p-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-text-secondary">No music archived yet.</p>
        )}
      </div>
    </div>
  );
}
