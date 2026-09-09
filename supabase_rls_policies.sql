-- Políticas RLS para blog_posts (ya existentes, se mantienen o actualizan si es necesario)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Permitir que todos lean las publicaciones
DROP POLICY IF EXISTS "Allow public read access" ON blog_posts;
CREATE POLICY "Allow public read access" ON blog_posts
FOR SELECT USING (true);

-- Permitir que los usuarios autenticados creen publicaciones
DROP POLICY IF EXISTS "Allow authenticated users to insert posts" ON blog_posts;
CREATE POLICY "Allow authenticated users to insert posts" ON blog_posts
FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Permitir que los autores actualicen sus propias publicaciones
DROP POLICY IF EXISTS "Allow authors to update their own posts" ON blog_posts;
CREATE POLICY "Allow authors to update their own posts" ON blog_posts
FOR UPDATE USING (auth.uid() = user_id);

-- Permitir que los autores eliminen sus propias publicaciones O que los administradores eliminen cualquier publicación
DROP POLICY IF EXISTS "Allow authors and admins to delete posts" ON blog_posts;
CREATE POLICY "Allow authors and admins to delete posts" ON blog_posts
FOR DELETE USING (
  auth.uid() = user_id OR (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'))
);

-- NUEVAS POLÍTICAS RLS PARA LA TABLA 'PROFILES'

-- Crear la tabla profiles si no existe
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email text UNIQUE, -- Almacenar email para facilitar la búsqueda, aunque auth.users ya lo tiene
  role text DEFAULT 'user' NOT NULL
);

-- Habilitar RLS para la tabla profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Permitir que los usuarios lean su propio perfil
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
CREATE POLICY "Users can view their own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

-- Permitir que los usuarios creen su propio perfil (ej. al registrarse)
DROP POLICY IF EXISTS "Users can create their own profile" ON profiles;
CREATE POLICY "Users can create their own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Permitir que los usuarios actualicen su propio perfil
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

-- Opcional: Permitir que los administradores vean todos los perfiles (para el dashboard de administración de usuarios, si se implementa)
-- DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
-- CREATE POLICY "Admins can view all profiles" ON profiles
-- FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));