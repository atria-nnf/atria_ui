-- Poliklinika Atria Database Schema
-- Initial migration for Supabase

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name JSONB NOT NULL,           -- {hr-HR: "", en-US: "", de-DE: ""}
  description JSONB,
  short_description JSONB,
  category VARCHAR(50),          -- specialist, diagnostics, preventive, aesthetic
  featured_image VARCHAR(500),
  icon VARCHAR(100),
  pricing JSONB,                 -- {basic: {}, standard: {}, premium: {}}
  duration VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  seo JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- DOCTORS TABLE
-- ============================================
CREATE TABLE doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  title JSONB,                   -- Localized titles
  specialty JSONB,               -- Localized specialties
  bio JSONB,
  credentials JSONB,             -- Array of credentials
  profile_image VARCHAR(500),
  video_preview VARCHAR(500),
  email VARCHAR(255),
  phone VARCHAR(50),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POSTS TABLE (Blog)
-- ============================================
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  content JSONB,                 -- Markdown content
  excerpt JSONB,
  featured_image VARCHAR(500),
  category VARCHAR(100),
  tags JSONB,                    -- Array of tags
  author_id UUID REFERENCES doctors(id) ON DELETE SET NULL,
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- TESTIMONIALS TABLE
-- ============================================
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

-- ============================================
-- FAQS TABLE
-- ============================================
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question JSONB NOT NULL,
  answer JSONB NOT NULL,
  category VARCHAR(100),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url VARCHAR(500) NOT NULL,
  caption JSONB,
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JOB POSTINGS TABLE
-- ============================================
CREATE TABLE job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title JSONB NOT NULL,
  department VARCHAR(100),
  employment_type VARCHAR(50),   -- full-time, part-time, contract
  location JSONB,
  description JSONB,
  requirements JSONB,            -- Array
  benefits JSONB,                -- Array
  salary_range VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  service VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new', -- new, read, responded
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SETTINGS TABLE (Single Types)
-- ============================================
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,  -- homepage, about_us, contact_info, etc.
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- JUNCTION TABLES
-- ============================================
CREATE TABLE service_doctors (
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES doctors(id) ON DELETE CASCADE,
  PRIMARY KEY (service_id, doctor_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_featured ON services(is_featured);
CREATE INDEX idx_services_order ON services(order_index);

CREATE INDEX idx_doctors_is_featured ON doctors(is_featured);
CREATE INDEX idx_doctors_order ON doctors(order_index);

CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_is_published ON posts(is_published);
CREATE INDEX idx_posts_is_featured ON posts(is_featured);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);

CREATE INDEX idx_testimonials_is_approved ON testimonials(is_approved);
CREATE INDEX idx_testimonials_is_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_service ON testimonials(service_id);

CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_service ON faqs(service_id);
CREATE INDEX idx_faqs_order ON faqs(order_index);

CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_is_featured ON gallery(is_featured);
CREATE INDEX idx_gallery_order ON gallery(order_index);

CREATE INDEX idx_job_postings_is_active ON job_postings(is_active);
CREATE INDEX idx_job_postings_department ON job_postings(department);

CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at DESC);

CREATE INDEX idx_settings_key ON settings(key);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to increment post views
CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON job_postings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
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

-- Public read policies (for website visitors)
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  USING (true);

CREATE POLICY "Doctors are viewable by everyone"
  ON doctors FOR SELECT
  USING (true);

CREATE POLICY "Published posts are viewable by everyone"
  ON posts FOR SELECT
  USING (is_published = true);

CREATE POLICY "Approved testimonials are viewable by everyone"
  ON testimonials FOR SELECT
  USING (is_approved = true);

CREATE POLICY "FAQs are viewable by everyone"
  ON faqs FOR SELECT
  USING (true);

CREATE POLICY "Gallery is viewable by everyone"
  ON gallery FOR SELECT
  USING (true);

CREATE POLICY "Active job postings are viewable by everyone"
  ON job_postings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Settings are viewable by everyone"
  ON settings FOR SELECT
  USING (true);

CREATE POLICY "Service-doctor relations are viewable by everyone"
  ON service_doctors FOR SELECT
  USING (true);

-- Public insert policy for contact submissions
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Admin write policies (authenticated users)
-- Note: In production, you'd want to check for specific admin roles
CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage doctors"
  ON doctors FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage posts"
  ON posts FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage faqs"
  ON faqs FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage gallery"
  ON gallery FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage job postings"
  ON job_postings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact submissions"
  ON contact_submissions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage settings"
  ON settings FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage service-doctor relations"
  ON service_doctors FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- ============================================
-- INITIAL SETTINGS DATA
-- ============================================
INSERT INTO settings (key, value) VALUES
  ('contact_info', '{
    "clinicName": "Poliklinika Atria",
    "phone": "+385 1 123 4567",
    "email": "info@atria.hr",
    "address": "Trg kralja Tomislava 1",
    "city": "Dugo Selo",
    "postalCode": "10370",
    "latitude": 45.8000,
    "longitude": 16.2167
  }'::jsonb),
  ('homepage', '{}'::jsonb),
  ('about_us', '{}'::jsonb),
  ('privacy_policy', '{}'::jsonb),
  ('terms_of_service', '{}'::jsonb),
  ('cookie_policy', '{}'::jsonb);
