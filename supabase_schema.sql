-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Profiles Table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS) on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create a trigger to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create Events Table
CREATE TABLE events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL, -- e.g., 'Workshop', 'Hackathon'
  location TEXT NOT NULL,
  price TEXT DEFAULT 'Free',
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL, -- Required for Ongoing/Past logic
  max_seats INTEGER,
  registration_link TEXT,
  image_url TEXT, -- Added for event posters
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Events Policies
CREATE POLICY "Events are viewable by everyone." ON events
  FOR SELECT USING (true);

-- Only admins can modify events
CREATE POLICY "Admins can insert events." ON events
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update events." ON events
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete events." ON events
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Insert fresh sample events with correct logic
-- 1. Ongoing Event (starts 1 hour ago, ends in 3 hours)
INSERT INTO events (title, description, event_type, location, start_time, end_time, registration_link, image_url) VALUES
('Live Student Builder Hackathon', '48 hours of pure building. Form teams, solve real-world problems, and win prizes. Join the livestream and get started now!', 'Hackathon', 'PODEVS Chennai Campus / Online', NOW() - INTERVAL '1 hour', NOW() + INTERVAL '3 hours', '#', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop');

-- 2. Upcoming Event (starts in 5 days)
INSERT INTO events (title, description, event_type, location, start_time, end_time, registration_link, image_url) VALUES
('Full-Stack Bootcamp: Next.js + Supabase', 'Build and deploy a full-stack app from scratch in one session. Perfect for beginners.', 'Workshop', 'Online (Zoom)', NOW() + INTERVAL '5 days', NOW() + INTERVAL '5 days 4 hours', 'https://forms.google.com/...', 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2062&auto=format&fit=crop');

-- 3. Another Upcoming Event (starts in 12 days)
INSERT INTO events (title, description, event_type, location, start_time, end_time, registration_link, image_url) VALUES
('DevTalks: Open Source & Your Career Path', 'Hear from engineers who started with open source contributions. Q&A session included.', 'Talk', 'Online (YouTube Live)', NOW() + INTERVAL '12 days', NOW() + INTERVAL '12 days 2 hours', '#', 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop');

-- Create Newsletter Table
CREATE TABLE newsletter_issues (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT DEFAULT 'Newsletter',
  excerpt TEXT,
  read_link TEXT DEFAULT '#',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE newsletter_issues ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Newsletter issues are viewable by everyone." ON newsletter_issues FOR SELECT USING (true);

-- Create Medium Table
CREATE TABLE medium_articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT DEFAULT 'Article',
  excerpt TEXT,
  read_time TEXT,
  external_link TEXT NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE medium_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Medium articles are viewable by everyone." ON medium_articles FOR SELECT USING (true);

-- Create Podcasts Table
CREATE TABLE podcasts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  guest TEXT,
  description TEXT,
  duration TEXT,
  audio_url TEXT DEFAULT '#',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE podcasts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Podcasts are viewable by everyone." ON podcasts FOR SELECT USING (true);

-- Create Roadmaps Table
CREATE TABLE roadmaps (
  id TEXT PRIMARY KEY, -- e.g., 'frontend'
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT, -- e.g., 'Layout', 'Server'
  accent_color TEXT, -- HEX
  bg_color_rgba TEXT, -- rgba(...)
  steps JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of {num, name, detail}
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Roadmaps are viewable by everyone." ON roadmaps FOR SELECT USING (true);

-- Create YouTube Videos Table
CREATE TABLE youtube_videos (
  id TEXT PRIMARY KEY, -- YouTube ID
  title TEXT NOT NULL,
  views_text TEXT, -- e.g., "12K views · 3 weeks ago"
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "YouTube videos are viewable by everyone." ON youtube_videos FOR SELECT USING (true);

-- Sample Data for Newsletter
INSERT INTO newsletter_issues (title, tag, excerpt, published_at) VALUES
('PODEVS Launches BuildFast Hackathon', 'Issue #42', 'We''re thrilled to announce our biggest community event yet. BuildFast is a 24-hour hackathon open to all students.', NOW() - INTERVAL '1 day'),
('The 30-Day Web Dev Challenge', 'Issue #41', 'A structured 30-day roadmap to go from zero to deployed portfolio.', NOW() - INTERVAL '10 days');

-- Sample Data for Medium
INSERT INTO medium_articles (title, tag, excerpt, read_time, external_link, published_at) VALUES
('The 30-Day Web Dev Challenge — Week by Week Plan', 'Resource', 'A structured 30-day roadmap to go from zero to deployed portfolio.', '5 min read', 'https://medium.com', NOW() - INTERVAL '10 days');

-- Sample Data for Podcasts
INSERT INTO podcasts (title, guest, description, duration, published_at) VALUES
('Building PODEVS: The Origin Story', 'Founder', 'We sit down to discuss why PODEVS was started and the vision for the future.', '45:20', NOW() - INTERVAL '4 days');

-- Sample Data for Roadmaps
INSERT INTO roadmaps (id, title, description, icon_name, accent_color, bg_color_rgba, steps) VALUES
('frontend', 'Frontend Developer', 'Master the art of building beautiful, interactive user interfaces.', 'Layout', '#3b82f6', 'rgba(59, 130, 246, 0.1)', '[{"num": 1, "name": "HTML & CSS", "detail": "Semantics, Flexbox, Grid, Responsiveness."}, {"num": 2, "name": "JavaScript Fundamentals", "detail": "ES6+, DOM Manipulation, Async/Await."}]'),
('backend', 'Backend Developer', 'Build scalable APIs, manage databases, and handle server logic.', 'Server', '#10b981', 'rgba(16, 185, 129, 0.1)', '[{"num": 1, "name": "Node.js & Express", "detail": "REST APIs, Middleware, Routing."}, {"num": 2, "name": "Databases (SQL & NoSQL)", "detail": "PostgreSQL, MongoDB, ORMs (Prisma)."}]');

-- Sample Data for YouTube
INSERT INTO youtube_videos (id, title, views_text, is_featured) VALUES
('dQw4w9WgXcQ', 'Build a Portfolio Website in 60 Minutes', '12K views · 3 weeks ago', true),
('9bZkp7q19f0', 'React Hooks Explained Simply', '8.4K views · 1 month ago', false),
('FTQbiNvZqaY', 'Deploy Your First App on Vercel', '5.2K views · 2 months ago', false);
