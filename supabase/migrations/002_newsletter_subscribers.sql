-- Newsletter subscribers collected from the footer and blog signup forms

CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  source VARCHAR(50) DEFAULT 'footer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public signup handled via service role in the API route; admins manage the list
CREATE POLICY "Admin full access newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');
