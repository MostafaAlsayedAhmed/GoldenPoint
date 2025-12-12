# How to Enable Public API Access

The API endpoints are working, but they return 403 (Forbidden) because the content is protected by default. Follow these steps to make your content publicly accessible:

## Steps to Configure API Permissions

1. **Open the Admin Panel**
   - Go to http://localhost:1337/admin
   - Log in with your admin credentials

2. **Navigate to Permissions**
   - Click on **Settings** (gear icon in the left sidebar)
   - Under "USERS & PERMISSIONS PLUGIN", click on **Roles**

3. **Configure Public Role**
   - Click on the **"Public"** role
   - You'll see a list of all your content types

4. **Enable Permissions for Each Content Type**

   For each content type you want to make publicly accessible, expand it and check these permissions:
   
   **Article:**
   - ✅ `find` (get all articles)
   - ✅ `findOne` (get single article)
   
   **FAQ:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Market Category:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Team Member:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Testimonial:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Statistic:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Service:**
   - ✅ `find`
   - ✅ `findOne`
   
   **Global Setting:**
   - ✅ `find` (for single types, there's only `find`)

5. **Save Changes**
   - Click the **"Save"** button at the top right

## Test the API

After saving, test your API endpoints:

```bash
# Get all articles
GET http://localhost:1337/api/articles

# Get all articles in Arabic with populated relations
GET http://localhost:1337/api/articles?locale=ar&populate=*

# Get all articles in English
GET http://localhost:1337/api/articles?locale=en&populate=*

# Get FAQs
GET http://localhost:1337/api/faqs?locale=ar

# Get global settings
GET http://localhost:1337/api/global-setting?locale=ar
```

## Important Notes

- **Default Locale**: If you don't specify `?locale=ar` or `?locale=en`, Strapi will return content in the default locale (Arabic)
- **Populate Relations**: Use `?populate=*` to include related data (like featured images, categories, etc.)
- **Security**: Only enable public access for content types that should be publicly readable. Keep admin-only content protected.

## Next Steps

1. Configure the permissions as described above
2. Add content in both Arabic and English
3. Test the API endpoints from your Next.js/Nuxt.js frontend
4. Refer to [API_INTEGRATION.md](file:///d:/New%20folder/CMS/API_INTEGRATION.md) for detailed API usage examples
