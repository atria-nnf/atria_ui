-- =============================================
-- STORAGE BUCKETS & POLICIES
-- Run this in Supabase SQL Editor
-- =============================================

-- Create buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Public read access for images
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'images');

-- Public read access for videos
CREATE POLICY "Public read videos" ON storage.objects FOR SELECT USING (bucket_id = 'videos');

-- Authenticated users can upload/delete images
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE USING (bucket_id = 'images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- Authenticated users can upload/delete videos
CREATE POLICY "Auth upload videos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'videos' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update videos" ON storage.objects FOR UPDATE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete videos" ON storage.objects FOR DELETE USING (bucket_id = 'videos' AND auth.role() = 'authenticated');

-- Authenticated users can manage documents (private bucket)
CREATE POLICY "Auth read documents" ON storage.objects FOR SELECT USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth upload documents" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update documents" ON storage.objects FOR UPDATE USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete documents" ON storage.objects FOR DELETE USING (bucket_id = 'documents' AND auth.role() = 'authenticated');
