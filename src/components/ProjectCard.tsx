import React, { useState } from 'react';
import { ExternalLink, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { Post } from '../types';
import Modal from './Modal';

interface ProjectCardProps {
  project: Post;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group bg-surface border border-border overflow-hidden hover:border-accent transition-all duration-300"
      >
        <div className="aspect-video overflow-hidden bg-bg relative">
          {project.projectThumbnail ? (
            <img
              src={project.projectThumbnail}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : project.projectUrl ? (
            <div className="w-full h-full relative group-hover:grayscale-0 grayscale transition-all duration-500">
              <iframe
                src={project.projectUrl}
                className="w-[200%] h-[200%] border-none origin-top-left scale-50 pointer-events-none"
                title={project.title}
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute inset-0 z-10" /> {/* Overlay to prevent interaction */}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-text-secondary uppercase tracking-widest">
              No Preview Available
            </div>
          )}
          
          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20">
            {project.projectUrl && (
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="p-3 bg-bg border border-border hover:border-accent hover:text-accent transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                title="Live Preview"
              >
                <Eye size={18} />
              </button>
            )}
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-bg border border-border hover:border-accent hover:text-accent transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                title="Visit Site"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors">
                {project.title}
              </h3>
            </div>
            <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
              Project // {project.id.substring(0, 8)}
            </p>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {project.content}
          </p>

          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent hover:text-text-primary transition-colors"
            >
              Live Preview
            </button>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-text-secondary hover:text-accent transition-colors"
            >
              Visit Site <span className="text-xs">→</span>
            </a>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <div className="w-full h-[80vh] bg-bg border border-border overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex justify-between items-center bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
              <span className="ml-4 text-[10px] font-mono text-text-secondary uppercase tracking-widest truncate max-w-[200px]">
                {project.projectUrl}
              </span>
            </div>
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 hover:bg-bg transition-colors"
            >
              <ExternalLink size={14} />
            </a>
          </div>
          <div className="flex-1 relative">
            <iframe
              src={project.projectUrl}
              className="w-full h-full border-none"
              title={project.title}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
            {/* Overlay to catch clicks if needed or handle loading */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ProjectCard;
