ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Permitir que todos lean las publicaciones
CREATE POLICY "Allow public read access" ON blog_posts
FOR SELECT USING (true);

-- Permitir que los usuarios autenticados creen publicaciones
CREATE POLICY "Allow authenticated users to insert posts" ON blog_posts
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir que los autores actualicen sus propias publicaciones
CREATE POLICY "Allow authors to update their own posts" ON blog_posts
FOR UPDATE USING (auth.uid() = user_id);

-- Permitir que los autores eliminen sus propias publicaciones
CREATE POLICY "Allow authors to delete their own posts" ON blog_posts
FOR DELETE USING (auth.uid() = user_id);