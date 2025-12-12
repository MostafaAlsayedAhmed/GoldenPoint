# Golden Point CMS - API Integration Guide

This guide explains how to integrate the Strapi CMS API with your Next.js or Nuxt.js frontend.

## Base URL

Development: `http://localhost:1337/api`

## Authentication

For public content, no authentication is required. For protected content, you'll need to include an API token in your requests.

## Internationalization (i18n)

All content types support Arabic (ar) and English (en). Use the `locale` parameter to fetch content in a specific language.

### Default Locale
Arabic (`ar`) is the default locale.

### Fetching Localized Content

```javascript
// Fetch articles in Arabic (default)
fetch('http://localhost:1337/api/articles')

// Fetch articles in English
fetch('http://localhost:1337/api/articles?locale=en')

// Fetch articles in Arabic (explicit)
fetch('http://localhost:1337/api/articles?locale=ar')
```

---

## API Endpoints

### Articles

**GET** `/api/articles` - Get all articles
**GET** `/api/articles/:id` - Get single article
**GET** `/api/articles?locale=ar` - Get Arabic articles
**GET** `/api/articles?locale=en` - Get English articles

#### Query Parameters
- `locale` - Language code (`ar` or `en`)
- `populate=*` - Include all relations (category, featuredImage)
- `filters[featured][$eq]=true` - Filter featured articles
- `filters[category][slug][$eq]=us-market` - Filter by category
- `sort=publishedDate:desc` - Sort by date (descending)
- `pagination[page]=1&pagination[pageSize]=10` - Pagination

#### Example Request (Next.js)
```javascript
const response = await fetch(
  'http://localhost:1337/api/articles?locale=ar&populate=*&sort=publishedDate:desc&pagination[pageSize]=6',
  { cache: 'no-store' }
);
const data = await response.json();
const articles = data.data;
```

#### Example Response
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "تحليل شامل لأرباح جيه بي مورغان تشيس",
        "slug": "jp-morgan-analysis",
        "excerpt": "تحليل مفصل للأرباح الفصلية...",
        "content": "...",
        "publishedDate": "2025-12-01",
        "author": "محمد أحمد",
        "featured": true,
        "featuredImage": {
          "data": {
            "attributes": {
              "url": "/uploads/image.jpg",
              "formats": {...}
            }
          }
        },
        "category": {
          "data": {
            "attributes": {
              "name": "السوق الأمريكي",
              "slug": "us-market"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "pageSize": 6,
      "pageCount": 5,
      "total": 30
    }
  }
}
```

---

### FAQs

**GET** `/api/faqs` - Get all FAQs
**GET** `/api/faqs?locale=ar` - Get Arabic FAQs
**GET** `/api/faqs?locale=en` - Get English FAQs

#### Query Parameters
- `locale` - Language code
- `filters[isActive][$eq]=true` - Only active FAQs
- `filters[category][$eq]=Training` - Filter by category
- `sort=order:asc` - Sort by order

#### Example Request
```javascript
const response = await fetch(
  'http://localhost:1337/api/faqs?locale=ar&filters[isActive][$eq]=true&sort=order:asc'
);
const data = await response.json();
```

---

### Market Categories

**GET** `/api/market-categories` - Get all market categories
**GET** `/api/market-categories/:id` - Get single category

#### Query Parameters
- `locale` - Language code
- `populate=articles` - Include related articles
- `sort=order:asc` - Sort by order

#### Example Request
```javascript
const response = await fetch(
  'http://localhost:1337/api/market-categories?locale=ar&populate=icon&sort=order:asc'
);
```

---

### Team Members

**GET** `/api/team-members` - Get all team members
**GET** `/api/team-members?locale=ar&populate=photo&sort=order:asc`

---

### Testimonials

**GET** `/api/testimonials` - Get all testimonials
**GET** `/api/testimonials?locale=ar&filters[isActive][$eq]=true&populate=photo&sort=order:asc`

---

### Statistics

**GET** `/api/statistics` - Get all statistics
**GET** `/api/statistics?locale=ar&sort=order:asc`

---

### Services

**GET** `/api/services` - Get all services
**GET** `/api/services?locale=ar&populate=icon&sort=order:asc`

---

### Global Settings (Single Type)

**GET** `/api/global-setting` - Get global settings
**GET** `/api/global-setting?locale=ar&populate=logo`

---

## Image URLs

Images are stored in the `/uploads` directory. To get the full URL:

```javascript
const imageUrl = `http://localhost:1337${image.attributes.url}`;
```

For responsive images, use the `formats` object:

```javascript
const thumbnail = image.attributes.formats.thumbnail.url;
const small = image.attributes.formats.small.url;
const medium = image.attributes.formats.medium.url;
const large = image.attributes.formats.large.url;
```

---

## Complete Example (Next.js App Router)

```javascript
// app/articles/page.js
export default async function ArticlesPage() {
  const response = await fetch(
    'http://localhost:1337/api/articles?locale=ar&populate=*&sort=publishedDate:desc',
    { cache: 'no-store' }
  );
  const { data: articles } = await response.json();

  return (
    <div>
      {articles.map((article) => (
        <article key={article.id}>
          <h2>{article.attributes.title}</h2>
          <p>{article.attributes.excerpt}</p>
          {article.attributes.featuredImage?.data && (
            <img 
              src={`http://localhost:1337${article.attributes.featuredImage.data.attributes.url}`}
              alt={article.attributes.title}
            />
          )}
        </article>
      ))}
    </div>
  );
}
```

---

## Complete Example (Nuxt.js)

```javascript
// composables/useStrapi.js
export const useStrapi = () => {
  const baseURL = 'http://localhost:1337/api';
  
  const fetchArticles = async (locale = 'ar') => {
    const response = await $fetch(`${baseURL}/articles`, {
      params: {
        locale,
        populate: '*',
        sort: 'publishedDate:desc'
      }
    });
    return response.data;
  };
  
  return {
    fetchArticles
  };
};

// pages/articles.vue
<script setup>
const { fetchArticles } = useStrapi();
const articles = await fetchArticles('ar');
</script>

<template>
  <div>
    <article v-for="article in articles" :key="article.id">
      <h2>{{ article.attributes.title }}</h2>
      <p>{{ article.attributes.excerpt }}</p>
    </article>
  </div>
</template>
```

---

## Environment Variables

Create a `.env.local` file in your frontend project:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
# or for Nuxt
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Then use it in your code:

```javascript
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
```

---

## Tips for RTL Support

When displaying Arabic content, make sure your frontend supports RTL:

```css
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="ltr"] {
  direction: ltr;
  text-align: left;
}
```

```javascript
// Detect locale and set direction
const locale = 'ar'; // or 'en'
document.documentElement.setAttribute('dir', locale === 'ar' ? 'rtl' : 'ltr');
```

---

## Production Deployment

For production, update the CORS configuration in `config/middlewares.ts` to include your production domain:

```typescript
origin: [
  'http://localhost:3000',
  'https://yourdomain.com',
  'https://www.yourdomain.com'
],
```
