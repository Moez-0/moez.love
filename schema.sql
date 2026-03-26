-- Create the posts table
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('thought', 'quote', 'music', 'moment', 'project', 'article', 'video')),
  title TEXT,
  content TEXT NOT NULL,
  author TEXT,
  image TEXT,
  spotify_id TEXT,
  artist TEXT,
  video_id TEXT,
  project_url TEXT,
  project_thumbnail TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 1. Posts Table Policies
-- Allow public read access
CREATE POLICY "Allow public read access" ON posts
  FOR SELECT USING (true);

-- Allow public insert (for admin dashboard)
CREATE POLICY "Allow public insert" ON posts
  FOR INSERT WITH CHECK (true);

-- Allow public update (for admin dashboard)
CREATE POLICY "Allow public update" ON posts
  FOR UPDATE USING (true);

-- Allow public delete (for admin dashboard)
CREATE POLICY "Allow public delete" ON posts
  FOR DELETE USING (true);

-- 2. Storage Bucket Policies (for "moments" bucket)
-- Note: Run these in the SQL editor. They target the storage.objects table.

-- Allow public read access to moments
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'moments');

-- Allow public uploads to moments
CREATE POLICY "Allow public insert" ON storage.objects
  FOR INSERT TO public WITH CHECK (bucket_id = 'moments');

-- Allow public updates to moments
CREATE POLICY "Allow public update" ON storage.objects
  FOR UPDATE TO public USING (bucket_id = 'moments');

-- Allow public deletes from moments
CREATE POLICY "Allow public delete" ON storage.objects
  FOR DELETE TO public USING (bucket_id = 'moments');

-- STORAGE BUCKET SETUP INSTRUCTIONS
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket named "moments"
-- 3. Set it to "Public"
-- 4. The policies above will handle the permissions if run in the SQL editor.
