-- =============================================
-- ATRIA CMS - Full Database Schema
-- Run this in Supabase SQL Editor
-- =============================================

-- 1. TABLES
-- =============================================

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name JSONB NOT NULL,
  description JSONB,
  short_description JSONB,
  category VARCHAR(50),
  featured_image VARCHAR(500),
  icon VARCHAR(100),
  pricing JSONB,
  duration VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  seo JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  title JSONB,
  specialty JSONB,
  bio JSONB,
  credentials JSONB,
  profile_image VARCHAR(500),
  video_preview VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  content JSONB,
  excerpt JSONB,
  featured_image VARCHAR(500),
  category VARCHAR(100),
  tags JSONB,
  author_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name VARCHAR(255) NOT NULL,
  content JSONB NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  is_featured BOOLEAN DEFAULT false,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question JSONB NOT NULL,
  answer JSONB NOT NULL,
  category VARCHAR(100),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url VARCHAR(500) NOT NULL,
  caption JSONB,
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  department VARCHAR(100),
  employment_type VARCHAR(50),
  location JSONB,
  description JSONB,
  requirements JSONB,
  benefits JSONB,
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE service_doctors (
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, doctor_id)
);

-- 2. INDEXES
-- =============================================

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_doctors_slug ON doctors(slug);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_published ON posts(is_published);
CREATE INDEX idx_settings_key ON settings(key);

-- 3. ROW LEVEL SECURITY
-- =============================================

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_doctors ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);
CREATE POLICY "Public read doctors" ON doctors FOR SELECT USING (true);
CREATE POLICY "Public read published posts" ON posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public read approved testimonials" ON testimonials FOR SELECT USING (is_approved = true);
CREATE POLICY "Public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read active jobs" ON job_postings FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read service_doctors" ON service_doctors FOR SELECT USING (true);

-- Public insert for contact form
CREATE POLICY "Public insert contact" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Admin full access (authenticated users)
CREATE POLICY "Admin full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access doctors" ON doctors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access posts" ON posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access faqs" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access gallery" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access jobs" ON job_postings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access service_doctors" ON service_doctors FOR ALL USING (auth.role() = 'authenticated');

-- 4. FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. INITIAL DATA
-- =============================================

INSERT INTO settings (key, value) VALUES
  ('contact_info', '{"clinicName": "Poliklinika Atria", "phone": "", "email": "", "address": "", "city": "", "postalCode": ""}'),
  ('homepage', '{"heroTitle": {"hr-HR": "", "en-US": "", "de-DE": ""}, "heroSubtitle": {"hr-HR": "", "en-US": "", "de-DE": ""}}'),
  ('about_us', '{"title": {"hr-HR": "", "en-US": "", "de-DE": ""}, "content": {"hr-HR": "", "en-US": "", "de-DE": ""}}');
