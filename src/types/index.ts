export interface BlogPost {
  id: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  image_url: string;
  content: string;
  user_id: string; // Añadido para asociar el post con el usuario
}

export interface ForumPost {
  id: string;
  user_id: string;
  author_email: string;
  title: string;
  content: string;
  created_at: string;
}