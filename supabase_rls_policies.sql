-- Eliminar la política existente si ya la tienes
DROP POLICY IF EXISTS "Allow authors to delete their own posts" ON blog_posts;

-- Permitir que los autores eliminen sus propias publicaciones O que los administradores eliminen cualquier publicación
CREATE POLICY "Allow authors and admins to delete posts" ON blog_posts
FOR DELETE USING (
  auth.uid() = user_id OR (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
);