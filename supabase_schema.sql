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
