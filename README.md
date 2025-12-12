# Golden Point - Strapi CMS

A self-hosted headless CMS for the Golden Point financial investment platform with full multilingual (Arabic/English) and RTL support.

## 🚀 Features

- ✅ **8 Content Types**: Articles, FAQs, Market Categories, Team Members, Testimonials, Statistics, Services, Global Settings
- ✅ **Multilingual Support**: Arabic (default) and English with i18n plugin
- ✅ **RTL Compatible**: Full support for right-to-left languages
- ✅ **REST & GraphQL APIs**: Flexible API access
- ✅ **Media Library**: Image upload and management
- ✅ **Self-Hosted**: Complete control over your data
- ✅ **CORS Configured**: Ready for Next.js/Nuxt.js integration

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## 🛠️ Installation

The project is already set up! Just install dependencies if needed:

```bash
cd "d:\New folder\CMS"
npm install
```

## 🏃 Running the Development Server

Start Strapi in development mode:

```bash
npm run develop
pnpm dev
```

The admin panel will be available at: **http://localhost:1337/admin**

On first run, you'll be prompted to create an admin user.

## 📝 Creating Your First Admin User

1. Start the development server
2. Navigate to `http://localhost:1337/admin`
3. Fill in the registration form:
   - First Name
   - Last Name
   - Email
   - Password (minimum 8 characters)
4. Click "Let's start"

## 🌍 Content Types

### Collection Types

1. **Article** - Blog posts and market analysis

   - Title, slug, excerpt, content (rich text)
   - Featured image, category, publish date
   - Author, SEO fields
   - i18n enabled

2. **FAQ** - Frequently asked questions

   - Question, answer (rich text)
   - Category, order, active status
   - i18n enabled

3. **Market Category** - Market types (US, European, Asian, etc.)

   - Name, slug, description
   - Icon image, order
   - Relation to articles
   - i18n enabled

4. **Team Member** - Company team and experts

   - Name, position, bio
   - Photo, social links
   - i18n enabled

5. **Testimonial** - Client reviews

   - Client name, company, content
   - Rating (1-5), photo
   - Active status, order
   - i18n enabled

6. **Statistic** - Homepage counters

   - Label, value, suffix
   - Icon, order
   - i18n enabled

7. **Service** - Investment services
   - Title, description (rich text)
   - Icon, features (JSON)
   - Order
   - i18n enabled

### Single Type

8. **Global Settings** - Site-wide configuration
   - Site name, description, logo
   - Contact info (email, phone, address)
   - Working hours, social media
   - Newsletter settings, footer text
   - i18n enabled

## 🔧 Configuration

### Locales

- **Default**: Arabic (`ar`)
- **Available**: Arabic (`ar`), English (`en`)

To add more locales:

1. Go to Settings → Internationalization
2. Click "Add new locale"
3. Select the locale and save

### CORS

CORS is configured to allow requests from:

- `http://localhost:3000`
- `http://localhost:3001`
- `http://localhost:3002`

To add more origins, edit `config/middlewares.ts`.

### API Permissions

By default, all content types are protected. To make them publicly accessible:

1. Go to Settings → Users & Permissions Plugin → Roles
2. Click on "Public"
3. Expand each content type
4. Check "find" and "findOne" permissions
5. Save

## 📚 API Documentation

See [API_INTEGRATION.md](./API_INTEGRATION.md) for detailed API usage, examples, and integration guides for Next.js and Nuxt.js.

### Quick API Examples

```bash
# Get all articles in Arabic
GET http://localhost:1337/api/articles?locale=ar&populate=*

# Get all articles in English
GET http://localhost:1337/api/articles?locale=en&populate=*

# Get FAQs
GET http://localhost:1337/api/faqs?locale=ar&filters[isActive][$eq]=true

# Get global settings
GET http://localhost:1337/api/global-setting?locale=ar&populate=logo
```

## 🗂️ Project Structure

```
CMS/
├── config/              # Configuration files
│   ├── admin.ts        # Admin panel config
│   ├── api.ts          # API config
│   ├── database.ts     # Database config (SQLite)
│   ├── middlewares.ts  # CORS and middleware config
│   ├── plugins.ts      # i18n plugin config
│   └── server.ts       # Server config
├── src/
│   ├── api/            # Content types
│   │   ├── article/
│   │   ├── faq/
│   │   ├── market-category/
│   │   ├── team-member/
│   │   ├── testimonial/
│   │   ├── statistic/
│   │   ├── service/
│   │   └── global-setting/
│   └── admin/          # Admin customization
├── public/             # Public assets
├── database/           # SQLite database files
└── package.json
```

## 🎯 Next Steps

1. **Start the server**: `npm run develop`
2. **Create admin user**: Visit `http://localhost:1337/admin`
3. **Add locales**: Settings → Internationalization → Add English locale
4. **Set API permissions**: Settings → Users & Permissions → Public role
5. **Create content**: Content Manager → Create entries in Arabic and English
6. **Test API**: Use the API endpoints in your frontend

## 📖 Adding Sample Content

### Example: Creating an Article

1. Go to Content Manager → Article → Create new entry
2. Fill in the Arabic version:
   - Title: "تحليل شامل لأرباح جيه بي مورغان تشيس"
   - Content: Add your article content
   - Upload featured image
   - Select category
   - Set publish date
3. Click "Save"
4. Click "Locales" → "English" to add English version
5. Fill in English content
6. Click "Publish"

## 🚀 Production Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Create a `.env` file for production:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret
```

### Database Migration

For production, consider migrating from SQLite to PostgreSQL:

1. Install PostgreSQL client: `npm install pg`
2. Update `config/database.ts`
3. Run migrations

## 📞 Support

For Strapi documentation: https://docs.strapi.io

## 📄 License

This project is set up for the Golden Point platform.
