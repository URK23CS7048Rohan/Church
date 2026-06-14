-- ==========================================
-- AGAPE INTERNATIONAL MINISTRIES DATABASE SEED SCRIPT
-- ==========================================
-- Run this SQL in your Supabase SQL Editor to populate your database with initial premium content!

-- 1. Seed Sermons
INSERT INTO public.sermons (id, title, date, speaker, video_url, description, series, created_at) VALUES
('a0b1c2d3-e4f5-6a7b-8c9d-0e1f2a3b4c5d', 'The Power of Grace', '2026-06-07', 'Pastor Johnathan Miller', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'An inspiring sermon on the depths of God''s grace and how it sustains us in difficult times.', 'Grace Unmeasured', NOW() - INTERVAL '7 days'),
('b0c1d2e3-f4a5-6b7c-8d9e-0f1a2b3c4d5e', 'Walking in Faith', '2026-05-31', 'Pastor Johnathan Miller', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A study on Abraham''s journey of faith and how we can apply those lessons to our modern daily struggles.', 'Living by Faith', NOW() - INTERVAL '14 days'),
('c0d1e2f3-a4b5-6c7d-8e9f-0a1b2c3d4e5f', 'Serving Our Neighbors', '2026-05-24', 'Pastor Sarah Jenkins', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'A challenging message calling us to step outside the walls of the church to serve our local community.', 'Outreach & Love', NOW() - INTERVAL '21 days');

-- 2. Seed Events (Outreach meetings, Bible study, Home cell groups)
INSERT INTO public.events (id, title, date, time, location, description, category, image_url, rsvp_count, created_at) VALUES
('d0e1f2a3-b4c5-6d7e-8f9a-0b1c2d3e4f5a', 'Midweek Bible Study', '2026-06-17', '7:00 PM', 'Chapel Room 2', 'A deep dive study into the Book of Romans. Bring your Bible and a notebook.', 'bible-study', 'https://images.unsplash.com/photo-1504052434569-70ad58565b90?w=800&auto=format&fit=crop&q=60', 12, NOW()),
('e0f1a2b3-c4d5-6e7f-8a9b-0c1d2e3f4a5b', 'Downtown Community Food Outreach', '2026-06-20', '9:00 AM', 'Shelter & Hope Center', 'Outreach meeting where we pack and distribute groceries to local families in need.', 'outreach', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=60', 25, NOW()),
('f0a1b2c3-d4e5-6f7a-8b9c-0d1e2f3a4b5c', 'Friday Night Home Meeting', '2026-06-19', '7:30 PM', 'The Miller''s Residence', 'A cozy cell group gathering for fellowship, worship, and group discussion.', 'home-meeting', 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=60', 8, NOW()),
('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Youth Fellowship Bonfire Night', '2026-06-27', '6:30 PM', 'North Beach Firepits', 'Fun night of worship, games, and s''mores for high schoolers and college students.', 'social', 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?w=800&auto=format&fit=crop&q=60', 19, NOW());

-- 3. Seed Songbook (Christian Song Encyclopedia)
INSERT INTO public.songbook (id, title, artist, key, lyrics, chords, created_at) VALUES
('b1c2d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e', 'Amazing Grace', 'John Newton', 'G', 
'Amazing grace how sweet the sound
That saved a wretch like me
I once was lost but now am found
Was blind but now I see

T''was grace that taught my heart to fear
And grace my fears relieved
How precious did that grace appear
The hour I first believed',
'{"lines": [
  {"lyrics": "Amazing grace how sweet the sound", "chords": "G             C              G"},
  {"lyrics": "That saved a wretch like me", "chords": "D"},
  {"lyrics": "I once was lost but now am found", "chords": "G             C              G"},
  {"lyrics": "Was blind but now I see", "chords": "D             G"}
]}', NOW()),

('c2d3e4f5-a6b7-8c9d-0e1f-2a3b4c5d6e7f', 'How Great Is Our God', 'Chris Tomlin', 'C',
'The splendor of a King, clothed in majesty
Let all the earth rejoice, all the earth rejoice
He wraps Himself in light, and darkness tries to hide
And trembles at His voice, trembles at His voice

How great is our God, sing with me
How great is our God, all will see
How great, how great is our God',
'{"lines": [
  {"lyrics": "The splendor of a King, clothed in majesty", "chords": "C                      Am"},
  {"lyrics": "Let all the earth rejoice, all the earth rejoice", "chords": "F2                     G"},
  {"lyrics": "He wraps Himself in light, and darkness tries to hide", "chords": "C                      Am"},
  {"lyrics": "And trembles at His voice, trembles at His voice", "chords": "F2                     G"},
  {"lyrics": "How great is our God, sing with me", "chords": "C                      Am"},
  {"lyrics": "How great is our God, all will see", "chords": "F2"},
  {"lyrics": "How great, how great is our God", "chords": "G            C"}
]}', NOW()),

('d3e4f5a6-b7c8-9d0e-1f2a-3b4c5d6e7f8a', '10,000 Reasons (Bless The Lord)', 'Matt Redman', 'G',
'Bless the Lord O my soul O my soul
Worship His holy name
Sing like never before O my soul
I''ll worship Your holy name

The sun comes up it''s a new day dawning
It''s time to sing Your song again
Whatever may pass and whatever lies before me
Let me be singing when the evening comes',
'{"lines": [
  {"lyrics": "Bless the Lord O my soul O my soul", "chords": "C             G        D       Em"},
  {"lyrics": "Worship His holy name", "chords": "C             G        Dsus4   D"},
  {"lyrics": "Sing like never before O my soul", "chords": "C      Em     C   D    Em"},
  {"lyrics": "I''ll worship Your holy name", "chords": "C      D       G"},
  {"lyrics": "The sun comes up it''s a new day dawning", "chords": "C             G        D       Em"},
  {"lyrics": "It''s time to sing Your song again", "chords": "C             G        D       Em"},
  {"lyrics": "Whatever may pass and whatever lies before me", "chords": "C             G        D       Em"},
  {"lyrics": "Let me be singing when the evening comes", "chords": "C2            G        D       G"}
]}', NOW());

-- 4. Seed Testimonies
INSERT INTO public.testimonies (id, user_id, author_name, title, content, is_approved, created_at) VALUES
('e4f5a6b7-c8d9-0e1f-2a3b-4c5d6e7f8a9b', NULL, 'Sarah Jenkins', 'Healed from Chronic Pain', 'After years of struggling with severe back pain, the prayer team prayed over me at a Sunday service. Two days later, all pain vanished! The doctors are baffled, but I know it''s a miracle.', TRUE, NOW() - INTERVAL '3 days'),
('f5a6b7c8-d90e-1f2a-3b4c-5d6e7f8a9b0c', NULL, 'Daniel Miller', 'Restored Marriage', 'My wife and I were on the verge of divorce. We joined an Agape Small Group and the support, prayer, and biblical guidance we received helped us forgive each other. Our marriage is stronger than ever.', TRUE, NOW() - INTERVAL '5 days'),
('a6b7c8d9-0e1f-2a3b-4c5d-6e7f8a9b0c1d', NULL, 'David Miller', 'Provision in Unemployment', 'I lost my job and couldn''t pay my rent. The church community supported me with groceries, and two weeks later I was offered a better job than the one I lost. God is indeed our Provider!', FALSE, NOW() - INTERVAL '1 day');
