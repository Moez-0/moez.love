import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { Post } from '../types';
import { Plus, Trash2, Edit2, X, Save, Lock, LogOut, Upload, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ADMIN_PASSWORD = 'Moezxx.fr123';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_auth', 'true');
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_auth');
  };

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setPosts(data.map((p: any) => ({
          id: p.id,
          type: p.type,
          title: p.title,
          content: p.content,
          author: p.author,
          image: p.image,
          spotifyId: p.spotify_id,
          artist: p.artist,
          videoId: p.video_id,
          projectUrl: p.project_url,
          projectThumbnail: p.project_thumbnail,
          url: p.url
        })));
      }
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `moments/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('moments')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('moments')
        .getPublicUrl(filePath);

      setEditingPost(prev => ({ ...prev, image: publicUrl }));
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Error uploading image. Make sure you have a "moments" bucket in Supabase Storage with public access.');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) {
        alert(`Error deleting: ${error.message}`);
        throw error;
      }
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const postData = {
      type: editingPost.type,
      title: editingPost.title,
      content: editingPost.content,
      author: editingPost.author,
      image: editingPost.image,
      spotify_id: editingPost.spotifyId,
      artist: editingPost.artist,
      video_id: editingPost.videoId,
      project_url: editingPost.projectUrl,
      project_thumbnail: editingPost.projectThumbnail,
      url: editingPost.url
    };

    try {
      if (editingPost.id) {
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', editingPost.id);
        if (error) {
          alert(`Error updating: ${error.message}`);
          throw error;
        }
      } else {
        const { error } = await supabase
          .from('posts')
          .insert([postData]);
        if (error) {
          alert(`Error creating: ${error.message}`);
          throw error;
        }
      }
      setEditingPost(null);
      setIsAdding(false);
      fetchPosts();
    } catch (err) {
      console.error('Error saving post:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-surface border border-border p-8"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-bg border border-border mb-4">
              <Lock size={32} className="text-accent" />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter uppercase">Admin Access</h1>
            <p className="text-text-secondary font-mono text-xs uppercase tracking-widest mt-2">
              Encrypted Vault Entry
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ENTER ACCESS KEY"
                className="w-full bg-bg border border-border p-4 font-mono text-sm focus:border-accent outline-none transition-colors"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-text-primary text-bg font-bold py-4 uppercase tracking-widest hover:bg-accent transition-colors"
            >
              Authenticate
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <header className="flex justify-between items-end mb-12 border-b border-border pb-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Dashboard</h1>
          <p className="text-text-secondary font-mono text-xs uppercase tracking-widest mt-2">
            Archive Management System
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setEditingPost({ type: 'thought', content: '' });
              setIsAdding(true);
            }}
            className="flex items-center gap-2 bg-text-primary text-bg px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-accent transition-colors"
          >
            <Plus size={16} /> New Entry
          </button>
          <button
            onClick={handleLogout}
            className="p-3 border border-border hover:border-accent transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          <div className="text-center py-20 font-mono text-text-secondary animate-pulse">
            LOADING ARCHIVE...
          </div>
        ) : (
          posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-surface border border-border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-text-secondary transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="p-2 bg-bg border border-border text-[10px] font-mono uppercase text-text-secondary">
                  {post.type}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium truncate">{post.title || post.content.substring(0, 50) + '...'}</h3>
                  <p className="text-xs text-text-secondary font-mono uppercase tracking-widest">
                    {post.artist || post.author || 'Archive Entry'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditingPost(post)}
                  className="p-2 border border-border hover:border-accent transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 border border-border hover:text-red-500 hover:border-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {(editingPost || isAdding) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full max-w-2xl bg-surface border border-border p-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold tracking-tighter uppercase">
                  {editingPost?.id ? 'Edit Entry' : 'New Entry'}
                </h2>
                <button onClick={() => { setEditingPost(null); setIsAdding(false); }}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-text-secondary">Type</label>
                    <select
                      value={editingPost?.type}
                      onChange={(e) => setEditingPost({ ...editingPost, type: e.target.value as any })}
                      className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                    >
                      <option value="thought">Thought</option>
                      <option value="quote">Quote</option>
                      <option value="music">Music</option>
                      <option value="moment">Moment</option>
                      <option value="project">Project</option>
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-text-secondary">Title</label>
                    <input
                      type="text"
                      value={editingPost?.title || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                      placeholder="Optional title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase text-text-secondary">Content</label>
                  <textarea
                    required
                    value={editingPost?.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent min-h-[150px]"
                    placeholder="Main content..."
                  />
                </div>

                {editingPost?.type === 'quote' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-text-secondary">Author</label>
                    <input
                      type="text"
                      value={editingPost?.author || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })}
                      className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                    />
                  </div>
                )}

                {editingPost?.type === 'music' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Artist</label>
                      <input
                        type="text"
                        value={editingPost?.artist || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, artist: e.target.value })}
                        className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Spotify ID</label>
                      <input
                        type="text"
                        value={editingPost?.spotifyId || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, spotifyId: e.target.value })}
                        className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                        placeholder="Track ID only"
                      />
                    </div>
                  </div>
                )}

                {editingPost?.type === 'video' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-text-secondary">YouTube Video ID</label>
                    <input
                      type="text"
                      value={editingPost?.videoId || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, videoId: e.target.value })}
                      className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                      placeholder="e.g. dQw4w9WgXcQ"
                    />
                  </div>
                )}

                {editingPost?.type === 'project' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Project URL</label>
                      <input
                        type="url"
                        value={editingPost?.projectUrl || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, projectUrl: e.target.value })}
                        className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Project Thumbnail URL (Optional)</label>
                      <input
                        type="text"
                        value={editingPost?.projectThumbnail || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, projectThumbnail: e.target.value })}
                        className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                        placeholder="Leave blank for auto-screenshot"
                      />
                    </div>
                  </div>
                )}

                {editingPost?.type === 'article' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase text-text-secondary">Article URL</label>
                    <input
                      type="url"
                      value={editingPost?.url || ''}
                      onChange={(e) => setEditingPost({ ...editingPost, url: e.target.value })}
                      className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                      placeholder="https://..."
                    />
                  </div>
                )}

                {editingPost?.type === 'moment' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Image Upload</label>
                      <div className="flex items-center gap-4">
                        <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-border p-8 cursor-pointer hover:border-accent transition-colors bg-bg/50">
                          {uploading ? (
                            <Loader2 className="animate-spin" size={20} />
                          ) : (
                            <Upload size={20} />
                          )}
                          <span className="text-xs font-mono uppercase">
                            {uploading ? 'Uploading...' : 'Choose File'}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase text-text-secondary">Or Image URL</label>
                      <input
                        type="text"
                        value={editingPost?.image || ''}
                        onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                        className="w-full bg-bg border border-border p-3 font-mono text-xs outline-none focus:border-accent"
                        placeholder="https://..."
                      />
                    </div>
                    {editingPost?.image && (
                      <div className="mt-4 border border-border p-2 bg-bg">
                        <img 
                          src={editingPost.image} 
                          alt="Preview" 
                          className="w-full h-32 object-cover grayscale"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-text-primary text-bg font-bold py-4 uppercase tracking-widest hover:bg-accent transition-colors flex items-center justify-center gap-2"
                >
                  <Save size={18} /> Save Entry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
