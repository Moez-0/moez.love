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
          className="flex items-center gap-3 text-accent"
        >
          <Folder size={20} />
          <span className="font-mono text-xs uppercase tracking-[0.3em]">Project Archive</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none"
        >
          Side <br />
          <span className="text-accent">Projects</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-text-secondary font-mono text-sm uppercase tracking-widest leading-relaxed"
        >
          A curated collection of websites, tools, and experiments built during my journey through the digital void.
        </motion.p>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-video bg-surface border border-border animate-pulse" />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-40 border border-dashed border-border">
          <p className="font-mono text-xs uppercase tracking-widest text-text-secondary">
            No projects found in the archive.
          </p>
        </div>
      )}

      <footer className="mt-40 pt-8 border-t border-border flex justify-between items-center font-mono text-[10px] text-text-secondary uppercase tracking-widest">
        <span>Vault Section // 004</span>
        <span>Total Projects: {projects.length}</span>
      </footer>
    </div>
  );
}
