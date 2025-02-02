/*
  # Blog System Implementation

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `content` (text, required)
      - `excerpt` (text, required)
      - `author_id` (uuid, references auth.users)
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `meta_title` (text)
      - `meta_description` (text)
      - `featured_image` (text)
      - `is_published` (boolean)
      
    - `blog_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references blog_posts)
      - `user_id` (uuid, references auth.users)
      - `content` (text, required)
      - `created_at` (timestamptz)
      - `is_approved` (boolean)

  2. Security
    - Enable RLS on both tables
    - Add policies for:
      - Anyone can read published posts
      - Only admins can create/update/delete posts
      - Authenticated users can create comments
      - Only admins can delete comments
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text NOT NULL,
  author_id uuid REFERENCES auth.users NOT NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  meta_title text,
  meta_description text,
  featured_image text,
  is_published boolean DEFAULT false,
  
  CONSTRAINT title_length CHECK (char_length(title) <= 200),
  CONSTRAINT excerpt_length CHECK (char_length(excerpt) <= 500),
  CONSTRAINT meta_title_length CHECK (char_length(meta_title) <= 60),
  CONSTRAINT meta_description_length CHECK (char_length(meta_description) <= 160)
);

-- Create blog_comments table
CREATE TABLE IF NOT EXISTS blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  is_approved boolean DEFAULT true,
  
  CONSTRAINT content_length CHECK (char_length(content) <= 1000)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;

-- Policies for blog_posts
CREATE POLICY "Anyone can read published posts"
  ON blog_posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can do everything with posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'admin@mushroomservice.com'
    )
  );

-- Policies for blog_comments
CREATE POLICY "Anyone can read approved comments"
  ON blog_comments
  FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can create comments"
  ON blog_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own comments"
  ON blog_comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all comments"
  ON blog_comments
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'admin@mushroomservice.com'
    )
  );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();