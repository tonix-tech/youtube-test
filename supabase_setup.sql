-- Create a table for videos
CREATE TABLE IF NOT EXISTS videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT,
  thumbnail TEXT,
  "channelName" TEXT,
  "channelAvatar" TEXT,
  views TEXT,
  "publishedTime" TEXT,
  likes INTEGER DEFAULT 0,
  category TEXT,
  description TEXT
);

-- Insert the mock data from INITIAL_VIDEOS
INSERT INTO videos (id, title, duration, thumbnail, "channelName", "channelAvatar", views, "publishedTime", likes, category, description) VALUES
('2PdB4LoqDvE', 'What if Minecraft was mechanical?', '15:32', 'https://img.youtube.com/vi/2PdB4LoqDvE/maxresdefault.jpg', 'Mumbo Jumbo', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80', '4.1M views', '2 weeks ago', 310000, 'Tanks', 'Today, we look at what would happen if Minecraft blocks followed mechanical engineering rules. Gears, pistons, and fully automated machinery.'),
('FaILnmUYS_U', 'Creating my own OS to run Tetris', '22:37', 'https://img.youtube.com/vi/FaILnmUYS_U/maxresdefault.jpg', 'jdh', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80', '1.7M views', '8 months ago', 95000, 'Software Design', 'Writing an entire operating system in assembly and C from scratch with the sole purpose of playing Tetris. No bootloaders, no standard libraries.'),
('WOZgEvJbnlc', 'F1 Aerodynamics - 1: The Basics', '7:57', 'https://img.youtube.com/vi/WOZgEvJbnlc/maxresdefault.jpg', 'Chain Bear', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80', '1.1M views', '4 years ago', 41000, 'Formula 1', 'How do aerodynamics work on a Formula 1 car? Exploring downforce, wings, and how air flows around the vehicle to generate grip.'),
('oBt53YbR9Kk', 'Dynamic Programming Intermediate Course', '5:10:02', 'https://img.youtube.com/vi/oBt53YbR9Kk/maxresdefault.jpg', 'freeCodeCamp', 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80', '3.6M views', '4 months ago', 180000, 'Python', 'An in-depth, interactive course on dynamic programming. Master memoization and tabulation techniques with practical algorithmic examples.'),
('r5pFyBHO8Fk', 'F1 Aerodynamics - 2: Turbulence, Drag & Vortices', '8:55', 'https://img.youtube.com/vi/r5pFyBHO8Fk/maxresdefault.jpg', 'Chain Bear', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80', '890K views', '3 years ago', 32000, 'Formula 1', 'What is turbulence and how does it affect the drag on a Formula 1 car? Stuart Taylor explains drag, wake, and aerodynamic design in F1.'),
('nej-5GhPqtw', 'How GOTYE created a song we used to know', '10:49', 'https://img.youtube.com/vi/nej-5GhPqtw/maxresdefault.jpg', 'Middle 8', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80', '920K views', '6 months ago', 62000, 'Software Design', 'An analysis of Gotyes mega-hit "Somebody That I Used To Know", its composition, the sample usage, and why it became an international phenomenon.'),
('RzWB5jL5RX0', 'Cracking Enigma in 2021', '22:15', 'https://img.youtube.com/vi/RzWB5jL5RX0/maxresdefault.jpg', 'Computerphile', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80', '1.1M views', '2 years ago', 71000, 'Java', 'Can we crack the famous German Enigma machine in seconds using modern computers? Mike Pound shows how the code works and writes a crack script.')
ON CONFLICT (id) DO NOTHING;

-- Allow read access to all users
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Enable read access for all users" ON "public"."videos";
CREATE POLICY "Enable read access for all users" ON "public"."videos" AS PERMISSIVE FOR SELECT TO public USING (true);
