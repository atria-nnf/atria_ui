// Services
export {
  getServices,
  getServiceBySlug,
  getFeaturedServices,
  getServicesByCategory,
  getAllServiceSlugs,
  getServicesWithDoctors,
} from './services'

// Doctors
export {
  getDoctors,
  getDoctorBySlug,
  getFeaturedDoctors,
  getDoctorsBySpecialty,
  getAllDoctorSlugs,
  getDoctorsWithServices,
} from './doctors'

// Posts (Blog)
export {
  getPosts,
  getPostBySlug,
  getRecentPosts,
  getFeaturedPosts,
  getPostsByCategory,
  getAllPostSlugs,
  getPostCategories,
  incrementPostViews,
  getPostWithAuthor,
} from './posts'

// Testimonials
export {
  getTestimonials,
  getFeaturedTestimonials,
  getTestimonialsByService,
  getTestimonialsWithServices,
} from './testimonials'

// FAQs
export {
  getFAQs,
  getFAQsByCategory,
  getFAQsByService,
  getFAQCategories,
} from './faqs'

// Gallery
export {
  getGalleryImages,
  getFeaturedGalleryImages,
  getGalleryByCategory,
  getGalleryCategories,
} from './gallery'

// Jobs
export {
  getJobPostings,
  getJobPostingBySlug,
  getJobPostingsByDepartment,
  getAllJobSlugs,
  getJobDepartments,
  getActiveJobs,
} from './jobs'

// Settings
export {
  getSetting,
  getHomepageSettings,
  getContactInfo,
  getAboutUsPage,
  getPrivacyPolicy,
  getTermsOfService,
  getCookiePolicy,
  getAllSettings,
} from './settings'

// Contact
export {
  submitContactForm,
  getContactSubmissions,
  updateContactSubmissionStatus,
  getContactSubmissionCounts,
} from './contact'
export type { ContactFormData, SubmitContactResult } from './contact'
