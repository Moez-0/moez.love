import React from 'react';
import { motion } from 'motion/react';
import { Post } from '../types';
import { Quote, Music, Camera, PenTool, Youtube, ExternalLink, BookOpen } from 'lucide-react';

interface FeedPostCardProps {
  post: Post;
  onClickImage?: (url: string) => void;
}

const FeedPostCard: React.FC<FeedPostCardProps> = ({ post, onClickImage }) => {
  const Icon = {
    thought: PenTool,
    quote: Quote,
    music: Music,
    moment: Camera,
    video: Youtube,
    article: BookOpen,
  }[post.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-surface border border-border p-6 mb-6 hover:border-text-secondary transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-bg border border-border">
            <Icon size={16} className="text-text-secondary" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary">
            {post.type}
          </span>
        </div>
      </div>

      {post.title && (
        <h3 className="text-lg font-medium mb-3 tracking-tight">{post.title}</h3>
      )}

      {post.type === 'quote' ? (
        <div className="relative py-4">
          <p className="text-xl italic font-serif leading-relaxed text-text-primary">
            "{post.content}"
          </p>
          {post.author && (
            <p className="mt-4 text-sm font-mono text-text-secondary">— {post.author}</p>
          )}
        </div>
      ) : (
        <p className="text-text-secondary leading-relaxed mb-4 whitespace-pre-wrap">
          {post.content}
        </p>
      )}

      {post.image && (
        <div 
          className="mb-4 overflow-hidden cursor-pointer"
          onClick={() => onClickImage?.(post.image!)}
        >
          <img
            src={post.image}
            alt={post.title || 'Moment'}
            className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
      )}

      {post.type === 'music' && post.spotifyId && (
        <div className="mt-4 overflow-hidden">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: '12px' }}
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
        <div className="mt-4 aspect-video overflow-hidden border border-border">
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
          className="mt-4 flex items-center justify-between p-4 bg-bg border border-border hover:border-accent transition-colors group/link"
        >
          <div className="flex items-center gap-3">
            <BookOpen size={18} className="text-text-secondary group-hover/link:text-accent transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest">Read Full Article</span>
          </div>
          <ExternalLink size={16} className="text-text-secondary group-hover/link:text-accent transition-colors" />
        </a>
      )}

      <div className="absolute top-0 right-0 w-1 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-1 h-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};

export default FeedPostCard;
