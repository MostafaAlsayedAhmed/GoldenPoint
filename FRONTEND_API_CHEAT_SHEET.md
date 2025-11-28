# Frontend API Cheat Sheet (GET Only)

This guide lists **only** the endpoints you need for the frontend website (fetching data).
Ignore the PUT, POST, DELETE endpoints in Swagger - those are for the admin panel or backend logic.

## 🌍 Global Parameters
Always add these to your requests:
- `locale=ar` (or `en`) - To get content in specific language
- `populate=*` - To get images and related data

---

## 🏠 Homepage Content

### Hero Banners
```http
GET /api/hero-banners?populate=*&locale=ar&sort=order:asc
```

### Statistics
```http
GET /api/statistics?populate=*&locale=ar&sort=order:asc
```

### Services
```http
GET /api/services?populate=*&locale=ar&sort=order:asc
```

### Process Steps (How it works)
```http
GET /api/process-steps?populate=*&locale=ar&sort=order:asc
```

### About Sections
```http
GET /api/about-sections?populate=*&locale=ar&sort=order:asc
```

### Partners
```http
GET /api/partners?populate=*&locale=ar&sort=order:asc
```

### Homepage Manager (Layout Settings)
```http
GET /api/homepage-manager?populate=*&locale=ar
```

---

## 📰 Blog & Market Analysis

### All Articles (with pagination)
```http
GET /api/articles?populate=*&locale=ar&sort=publishedDate:desc&pagination[page]=1&pagination[pageSize]=6
```

### Single Article (by Slug)
```http
GET /api/articles?filters[slug][$eq]=my-article-slug&populate=*&locale=ar
```

### Market Categories
```http
GET /api/market-categories?populate=*&locale=ar&sort=order:asc
```

### Filter Articles by Category
```http
GET /api/articles?filters[category][slug][$eq]=us-market&populate=*&locale=ar
```

---

## 🎓 Academy & Courses

### All Courses
```http
GET /api/courses?populate=*&locale=ar&sort=order:asc
```

### Single Course (by Slug)
```http
GET /api/courses?filters[slug][$eq]=course-slug&populate=*&locale=ar
```

### Instructors
```http
GET /api/instructors?populate=*&locale=ar&sort=order:asc
```

### Course Packages
```http
GET /api/course-packages?populate=*&locale=ar&sort=order:asc
```

---

## ℹ️ Other Pages

### FAQs
```http
GET /api/faqs?populate=*&locale=ar&sort=order:asc
```

### Team Members
```http
GET /api/team-members?populate=*&locale=ar&sort=order:asc
```

### Testimonials
```http
GET /api/testimonials?populate=*&locale=ar&sort=order:asc
```

### Global Settings (Footer, Contact Info)
```http
GET /api/global-setting?populate=*&locale=ar
```
