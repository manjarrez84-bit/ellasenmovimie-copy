-- Migration: Create subscriptions table for newsletter

-- Create the subscriptions table if it doesn't exist
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert subscriptions (for newsletter form)
DROP POLICY IF EXISTS "Allow newsletter subscriptions" ON subscriptions;
CREATE POLICY "Allow newsletter subscriptions" ON subscriptions
FOR INSERT WITH CHECK (true);

-- Policy: Allow admins to view all subscriptions
DROP POLICY IF EXISTS "Admins can view all subscriptions" ON subscriptions;
CREATE POLICY "Admins can view all subscriptions" ON subscriptions
FOR SELECT USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));

-- Policy: Allow admins to delete subscriptions
DROP POLICY IF EXISTS "Admins can delete subscriptions" ON subscriptions;
CREATE POLICY "Admins can delete subscriptions" ON subscriptions
FOR DELETE USING (auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin'));