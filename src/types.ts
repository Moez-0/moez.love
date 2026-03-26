export interface Post {
  id: string;
  type: 'thought' | 'quote' | 'music' | 'moment' | 'project' | 'article' | 'video';
  title?: string;
  content: string;
  author?: string;
  image?: string;
  spotifyId?: string;
  artist?: string;
  videoId?: string;
  projectUrl?: string;
  projectThumbnail?: string;
  url?: string;
}
