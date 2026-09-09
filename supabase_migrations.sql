ALTER TABLE blog_posts
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;