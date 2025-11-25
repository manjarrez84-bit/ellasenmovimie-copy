export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  summary: string;
  image_url: string;
  content: string;
}

export interface ForumPost {
  id: string;
  user_id: string;
  author_email: string;
  title: string;
  content: string;
  created_at: string;
}