export interface Post {
  id: string;
  type: 'thought' | 'quote' | 'music' | 'moment' | 'video' | 'article';
  title?: string;
  content: string;
  author?: string;
  image?: string;
  spotifyId?: string;
  artist?: string;
  videoId?: string;
  url?: string;
}
