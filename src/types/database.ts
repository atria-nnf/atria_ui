// Database types for Supabase
// These can be auto-generated with: npx supabase gen types typescript --project-id YOUR_PROJECT_ID

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// Localized content type (JSONB field)
export type LocalizedContent = {
  'hr-HR'?: string
  'en-US'?: string
  'de-DE'?: string
}

export type Database = {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          slug: string
          name: LocalizedContent
          description: LocalizedContent | null
          short_description: LocalizedContent | null
          category: string | null
          categories: string[] | null
          featured_image: string | null
          icon: string | null
          pricing: Json | null
          duration: string | null
          partner_logos: Json | null
          steps: Json | null
          is_featured: boolean
          order_index: number
          seo: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: LocalizedContent
          description?: LocalizedContent | null
          short_description?: LocalizedContent | null
          category?: string | null
          categories?: string[] | null
          featured_image?: string | null
          icon?: string | null
          pricing?: Json | null
          duration?: string | null
          partner_logos?: Json | null
          steps?: Json | null
          is_featured?: boolean
          order_index?: number
          seo?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: LocalizedContent
          description?: LocalizedContent | null
          short_description?: LocalizedContent | null
          category?: string | null
          categories?: string[] | null
          featured_image?: string | null
          icon?: string | null
          pricing?: Json | null
          duration?: string | null
          partner_logos?: Json | null
          steps?: Json | null
          is_featured?: boolean
          order_index?: number
          seo?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          slug: string
          name: string
          title: LocalizedContent | null
          specialty: LocalizedContent | null
          bio: LocalizedContent | null
          credentials: Json | null
          profile_image: string | null
          video_preview: string | null
          email: string | null
          phone: string | null
          is_featured: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          title?: LocalizedContent | null
          specialty?: LocalizedContent | null
          bio?: LocalizedContent | null
          credentials?: Json | null
          profile_image?: string | null
          video_preview?: string | null
          email?: string | null
          phone?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          title?: LocalizedContent | null
          specialty?: LocalizedContent | null
          bio?: LocalizedContent | null
          credentials?: Json | null
          profile_image?: string | null
          video_preview?: string | null
          email?: string | null
          phone?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          slug: string
          title: LocalizedContent
          content: LocalizedContent | null
          excerpt: LocalizedContent | null
          featured_image: string | null
          category: string | null
          tags: Json | null
          author_id: string | null
          service_id: string | null
          views: number
          is_featured: boolean
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: LocalizedContent
          content?: LocalizedContent | null
          excerpt?: LocalizedContent | null
          featured_image?: string | null
          category?: string | null
          tags?: Json | null
          author_id?: string | null
          service_id?: string | null
          views?: number
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: LocalizedContent
          content?: LocalizedContent | null
          excerpt?: LocalizedContent | null
          featured_image?: string | null
          category?: string | null
          tags?: Json | null
          author_id?: string | null
          service_id?: string | null
          views?: number
          is_featured?: boolean
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          content: LocalizedContent
          rating: number | null
          service_id: string | null
          is_featured: boolean
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          author_name: string
          content: LocalizedContent
          rating?: number | null
          service_id?: string | null
          is_featured?: boolean
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          content?: LocalizedContent
          rating?: number | null
          service_id?: string | null
          is_featured?: boolean
          is_approved?: boolean
          created_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: LocalizedContent
          answer: LocalizedContent
          category: string | null
          service_id: string | null
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          question: LocalizedContent
          answer: LocalizedContent
          category?: string | null
          service_id?: string | null
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          question?: LocalizedContent
          answer?: LocalizedContent
          category?: string | null
          service_id?: string | null
          order_index?: number
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          image_url: string
          caption: LocalizedContent | null
          category: string | null
          is_featured: boolean
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          image_url: string
          caption?: LocalizedContent | null
          category?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          image_url?: string
          caption?: LocalizedContent | null
          category?: string | null
          is_featured?: boolean
          order_index?: number
          created_at?: string
        }
      }
      job_postings: {
        Row: {
          id: string
          slug: string
          title: LocalizedContent
          department: string | null
          employment_type: string | null
          location: LocalizedContent | null
          description: LocalizedContent | null
          requirements: Json | null
          benefits: Json | null
          salary_range: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: LocalizedContent
          department?: string | null
          employment_type?: string | null
          location?: LocalizedContent | null
          description?: LocalizedContent | null
          requirements?: Json | null
          benefits?: Json | null
          salary_range?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: LocalizedContent
          department?: string | null
          employment_type?: string | null
          location?: LocalizedContent | null
          description?: LocalizedContent | null
          requirements?: Json | null
          benefits?: Json | null
          salary_range?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          service: string | null
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          service?: string | null
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          service?: string | null
          message?: string
          status?: string
          created_at?: string
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      service_doctors: {
        Row: {
          service_id: string
          doctor_id: string
        }
        Insert: {
          service_id: string
          doctor_id: string
        }
        Update: {
          service_id?: string
          doctor_id?: string
        }
      }
    }
    Functions: {
      increment_post_views: {
        Args: {
          post_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for easier use
export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

// Convenience type aliases
export type Service = Tables<'services'>
export type Doctor = Tables<'doctors'>
export type Post = Tables<'posts'>
export type Testimonial = Tables<'testimonials'>
export type FAQ = Tables<'faqs'>
export type GalleryImage = Tables<'gallery'>
export type JobPosting = Tables<'job_postings'>
export type ContactSubmission = Tables<'contact_submissions'>
export type Setting = Tables<'settings'>
