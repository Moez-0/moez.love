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
    <div className="mx-auto max-w-4xl px-4 py-16 md:py-20">
      <header className="mb-12 border-b border-border/80 pb-7">
        <p className="mb-2 text-xs tracking-[0.2em] text-text-secondary">SOUND LOG</p>
        <h2 className="text-4xl md:text-5xl">Music</h2>
      </header>

      <div className="space-y-16">
        {loading ? (
          <div className="space-y-12">
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          tracks.map((track) => (
            <div key={track.id} className="pixel-panel group bg-surface px-5 py-6 md:px-7 md:py-8">
              <div className="flex items-start gap-4 md:gap-6 mb-4">
                <div className="shrink-0 bg-bg/80 p-3 md:p-4 group-hover:text-text-primary transition-colors">
                  <MusicIcon size={20} className="md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="mb-1 truncate text-3xl md:text-4xl">{track.title}</h3>
                  </div>
                  <p className="truncate text-xs md:text-sm tracking-[0.16em] text-text-secondary">
                    {track.artist}
                  </p>
                </div>
              </div>
              
              <div className="md:pl-[76px]">
                <p className="mb-6 text-[1.02rem] leading-8 text-text-secondary">
                  {track.content}
                </p>

                {track.spotifyId && (
                  <div className="overflow-hidden">
                    <iframe
                      data-testid="embed-iframe"
                      style={{ borderRadius: '0px' }}
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
          <p className="pixel-panel bg-surface p-6 text-center text-xs tracking-[0.16em] text-text-secondary">No music archived yet.</p>
        )}
      </div>
    </div>
  );
}
