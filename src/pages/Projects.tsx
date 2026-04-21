import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Post } from '../types';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'motion/react';
import { Folder } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'project')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setProjects(data.map((p: any) => ({
          id: p.id,
          type: p.type as 'project',
          title: p.title,
          content: p.content,
          author: p.author,
          image: p.image,
          spotifyId: p.spotify_id,
          artist: p.artist,
          projectUrl: p.project_url,
          projectThumbnail: p.project_thumbnail,
          url: p.url
        })));
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-16 md:py-20">
      <header className="mb-14 border-b border-border/80 pb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4 inline-flex items-center gap-2 border border-border/80 bg-surface/80 px-4 py-2 text-text-primary"
        >
          <Folder size={16} />
          <span className="text-xs tracking-[0.2em]">PROJECT GRID</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl leading-[1.02] md:text-7xl"
        >
          Projects
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-base leading-8 text-text-secondary md:text-lg"
        >
          Builds, tools, and tests.
        </motion.p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pixel-panel aspect-video animate-pulse bg-surface" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="pixel-panel bg-surface py-40 text-center">
          <p className="text-xs tracking-[0.16em] text-text-secondary">
            No projects found in the archive.
          </p>
        </div>
      )}

      <footer className="mt-24 flex items-center justify-between border-t border-border/80 pt-6 text-[10px] tracking-[0.16em] text-text-secondary">
        <span>NEON BLOCK</span>
        <span>Total Projects: {projects.length}</span>
      </footer>
    </div>
  );
}
