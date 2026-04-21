import React from 'react';
import { motion } from 'motion/react';
import { Post } from '../types';
import { Quote, Music, Camera, PenTool, Youtube, ExternalLink, BookOpen } from 'lucide-react';

interface FeedPostCardProps {
  post: Post;
  onClickImage?: (url: string) => void;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({ post, onClickImage }) => {
  const icons = {
    thought: PenTool,
    quote: Quote,
    music: Music,
    moment: Camera,
    article: BookOpen,
    video: Youtube,
  };
  const Icon = icons[post.type as keyof typeof icons] || PenTool;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="pixel-panel group relative mb-6 bg-surface px-5 py-6 md:px-7 md:py-8 transition-all duration-300 hover:-translate-y-0.5"
    >
      <div className="mb-4 flex items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="bg-bg/80 p-2">
            <Icon size={15} className="text-text-secondary" />
          </div>
          <span className="pixel-tag">
            {post.type}
          </span>
        </div>
      </div>

      {post.title && (
        <h3 className="mb-3 text-3xl leading-tight md:text-4xl">{post.title}</h3>
      )}

      {post.type === 'quote' ? (
        <div className="relative py-4">
          <p className="font-serif text-3xl leading-relaxed text-text-primary md:text-4xl">
            "{post.content}"
          </p>
          {post.author && (
            <p className="mt-5 text-sm tracking-[0.14em] text-text-secondary">— {post.author}</p>
          )}
        </div>
      ) : (
        <p className="mb-5 whitespace-pre-wrap text-[1.02rem] leading-8 text-text-secondary">
          {post.content}
        </p>
      )}

      {post.image && (
        <div 
          className="mb-5 cursor-pointer overflow-hidden border border-border/70"
          onClick={() => onClickImage?.(post.image!)}
        >
          <img
            src={post.image}
            alt={post.title || 'Moment'}
            className="h-auto w-full transition-all duration-500 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {post.type === 'music' && post.spotifyId && (
        <div className="mt-4 overflow-hidden">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '0px' }}
            src={`https://open.spotify.com/embed/track/${post.spotifyId}?utm_source=generator`}
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


      {post.type === 'video' && post.videoId && (
        <div className="mt-5 aspect-video overflow-hidden border border-border/70">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${post.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="block"
          ></iframe>
        </div>
      )}

      {post.type === 'article' && post.url && (
        <a 
          href={post.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="group/link mt-5 flex items-center justify-between border border-border bg-bg/80 px-4 py-3 transition-colors hover:border-text-primary"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-text-secondary group-hover/link:text-text-primary transition-colors" />
            <span className="text-xs tracking-[0.14em]">Read full article</span>
          </div>
          <ExternalLink size={16} className="text-text-secondary group-hover/link:text-text-primary transition-colors" />
        </a>
      )}
    </motion.div>
  );
};

export default FeedPostCard;
