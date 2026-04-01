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
    <div className="max-w-6xl mx-auto py-20 px-4 min-h-screen">
      <header className="mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="pixel-panel inline-flex items-center gap-3 bg-surface px-4 py-2 text-text-primary"
        >
          <Folder size={20} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">Project World</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold uppercase leading-none"
        >
          Side <br />
          <span className="text-text-primary">Projects</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pixel-panel max-w-xl bg-surface p-4 text-sm font-mono uppercase tracking-[0.15em] text-text-secondary leading-relaxed"
        >
          A curated list of websites, tools, and experiments.
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
        <div className="pixel-panel bg-surface text-center py-40">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            No projects found in the archive.
          </p>
        </div>
      )}

      <footer className="mt-40 flex items-center justify-between border-t-2 border-border pt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-text-secondary">
        <span>Zone 004</span>
        <span>Total Projects: {projects.length}</span>
      </footer>
    </div>
  );
}
