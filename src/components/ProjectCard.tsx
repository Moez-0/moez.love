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
        className="pixel-panel group overflow-hidden bg-surface transition-all duration-300 hover:-translate-y-1"
      >
        <div className="relative aspect-video overflow-hidden bg-bg">
          {project.projectThumbnail ? (
            <img
              src={project.projectThumbnail}
              alt={project.title}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : project.projectUrl ? (
            <div className="relative h-full w-full transition-all duration-500">
              <iframe
                src={project.projectUrl}
                className="w-[200%] h-[200%] border-none origin-top-left scale-50 pointer-events-none"
                title={project.title}
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute inset-0 z-10" /> {/* Overlay to prevent interaction */}
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm font-mono uppercase tracking-wider text-text-secondary">
              No Preview Available
            </div>
          )}
          
          <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 bg-accent/10 opacity-0 transition-opacity group-hover:opacity-100">
            {project.projectUrl && (
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="translate-y-4 border-2 border-border bg-bg p-3 transition-all duration-300 group-hover:translate-y-0 hover:border-text-primary hover:text-text-primary"
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
                className="translate-y-4 border-2 border-border bg-bg p-3 transition-all delay-75 duration-300 group-hover:translate-y-0 hover:border-text-primary hover:text-text-primary"
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
              <h3 className="text-3xl font-bold transition-colors group-hover:text-text-primary">
                {project.title}
              </h3>
            </div>
            <p className="text-xs font-mono uppercase tracking-wide text-text-secondary">
              Project #{project.id.substring(0, 8)}
            </p>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {project.content}
          </p>

          <div className="pt-4 border-t border-border/50 flex items-center justify-between">
            <button
              onClick={() => setIsPreviewOpen(true)}
              className="pixel-button px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors"
            >
              Live Preview
            </button>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-wide text-text-secondary transition-colors hover:text-text-primary"
            >
              Visit Site <span className="text-xs">→</span>
            </a>
          </div>
        </div>
      </motion.div>

      <Modal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)}>
        <div className="flex h-[80vh] w-full flex-col overflow-hidden border-2 border-border bg-bg">
          <div className="flex items-center justify-between border-b border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 bg-text-primary/45" />
              <div className="h-2.5 w-2.5 bg-text-secondary/45" />
              <div className="h-2.5 w-2.5 bg-border" />
              <span className="ml-4 max-w-[200px] truncate text-xs font-mono uppercase tracking-wide text-text-secondary">
                {project.projectUrl}
              </span>
            </div>
            <a 
              href={project.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="border border-border p-2 transition-colors hover:bg-bg"
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
