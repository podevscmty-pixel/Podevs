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
  end_time TIMESTAMP WITH TIME ZONE,
  max_seats INTEGER,
  registration_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS on events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Events Policies
CREATE POLICY "Events are viewable by everyone." ON events
  FOR SELECT USING (true);

-- Only admins can modify events (Requires you to set your role to 'admin' manually in the database)
CREATE POLICY "Admins can insert events." ON events
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can update events." ON events
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can delete events." ON events
  FOR DELETE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- Insert some dummy events data
INSERT INTO events (title, description, event_type, location, start_time, end_time, max_seats, registration_link) VALUES
('Full-Stack Bootcamp: Next.js + Supabase', 'Build and deploy a full-stack app from scratch in one session. Perfect for beginners.', 'Workshop', 'Online (Zoom)', NOW() + INTERVAL '10 days', NOW() + INTERVAL '10 days 4 hours', 100, 'https://forms.google.com/...'),
('BuildFast Hackathon — 24hr Sprint', 'Form a team, pick a problem, and ship a working product in 24 hours.', 'Hackathon', 'Chennai Campus', NOW() + INTERVAL '15 days', NOW() + INTERVAL '16 days', 300, 'https://lu.ma/...'),
('DevTalks: Open Source & Your Career', 'Hear from engineers who started with open source contributions. Q&A session included.', 'Talk', 'Online (YouTube Live)', NOW() + INTERVAL '25 days', NOW() + INTERVAL '25 days 2 hours', NULL, NULL);
