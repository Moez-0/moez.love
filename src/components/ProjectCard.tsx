import React from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { Post } from '../types';

interface ProjectCardProps {
  project: Post;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
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
        ) : (
          <div className="w-full h-full flex items-center justify-center font-mono text-[10px] text-text-secondary uppercase tracking-widest">
            No Preview Available
          </div>
        )}
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold tracking-tighter uppercase group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-bg border border-border hover:border-accent hover:text-accent transition-all"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          <p className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
            Project // {project.id.substring(0, 8)}
          </p>
        </div>

        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
          {project.content}
        </p>

        <div className="pt-4 border-t border-border/50">
          <a
            href={project.projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-accent hover:text-text-primary transition-colors"
          >
            Visit Project <span className="text-xs">→</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
