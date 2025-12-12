# Deployment Workflow Guide

## The Problem

When developing locally and deploying to production, you may experience the classic **development vs. production data conflict**. Deploying new features with your local database overwrites the production database with local data, causing data loss.

## The Key Principle

**Code flows down (local → production), Data flows up (production → local)**

### What Should Be Version-Controlled and Deployed

- ✅ Code changes (new features, bug fixes)
- ✅ Schema/Content-Type definitions
- ✅ Configuration files
- ✅ Plugin configurations

### What Should NOT Be Deployed from Local

- ❌ Actual content data (entries in your collections)
- ❌ Media files that users uploaded in production
- ❌ User accounts created in production

---

## Recommended Workflow for Strapi

### 1. Schema/Content-Type Changes

#### Local Development

- Modify content types in Strapi admin
- Strapi automatically updates schema files in `/api` folder

#### Version Control

- Commit the schema files (JSON files in `api/*/content-types`)
- Push to repository

#### Production Deployment

- Pull latest code
- Restart Strapi
- Strapi automatically applies schema changes to production DB

### 2. Configuration Changes

Use **environment variables** for different environments:

```javascript
// config/database.ts
export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "strapi"),
      user: env("DATABASE_USERNAME", "strapi"),
      password: env("DATABASE_PASSWORD", "strapi"),
    },
  },
});
```

---

## Database Strategy

### Use Separate Databases

- **Local**: Your development database (can be SQLite for simplicity)
- **Staging**: A copy of production data for testing
- **Production**: Real user data

> [!CAUTION] > **Never overwrite production database with local data!**

---

## Data Migration Approaches

### Option 1: Manual Migration (Small Changes)

1. Deploy your code changes to production
2. Manually recreate the test data in production admin panel

**Cons**: Time-consuming, error-prone

### Option 2: Use Strapi's Data Transfer (Recommended)

Strapi has built-in data transfer commands:

```bash
# Export data from production
strapi export --no-encrypt --file backup

# Import specific data to local (for testing)
strapi import --file backup --exclude files,admin-users
```

### Option 3: Use Seed Scripts

Create seed scripts for initial/test data:

```javascript
// src/index.ts or custom script
module.exports = {
  async bootstrap({ strapi }) {
    // Only run in development
    if (process.env.NODE_ENV === "development") {
      // Seed test data
      const count = await strapi.db.query("api::event.event").count();
      if (count === 0) {
        await strapi.db.query("api::event.event").create({
          data: {
            name: "Test Event",
            // ... other fields
          },
        });
      }
    }
  },
};
```

---

## Production-Ready Setup

### A. Environment Configuration

Create `.env` files for each environment:

#### Production Environment

```bash
# .env.production
NODE_ENV=production
DATABASE_CLIENT=postgres
DATABASE_HOST=your-production-host
DATABASE_PORT=5432
DATABASE_NAME=strapi_production
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=secure_password
```

#### Development Environment (Local)

```bash
# .env.development
NODE_ENV=development
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

### B. Implement Proper CI/CD

Example GitHub Actions workflow:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Don't include database files!
      - name: Build
        run: |
          npm install
          npm run build

      - name: Deploy (code only)
        run: |
          # Deploy to server (rsync, ssh, etc.)
          # Exclude: .tmp, .env, database files
          rsync -avz --exclude='.tmp' --exclude='.env' --exclude='*.db' ./ user@server:/path/to/app
```

### C. Database Backups

> [!IMPORTANT]
> Always backup production before deploying!

#### PostgreSQL Example

```bash
# Create backup
pg_dump -U username dbname > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore if needed
psql -U username dbname < backup_file.sql
```

#### SQLite Example

```bash
# Create backup
cp .tmp/data.db .tmp/data.db.backup_$(date +%Y%m%d_%H%M%S)

# Restore if needed
cp .tmp/data.db.backup_YYYYMMDD_HHMMSS .tmp/data.db
```

### D. Migrations for Data Changes

For complex data transformations, create migration scripts:

```javascript
// database/migrations/001_update_guest_schema.js
module.exports = {
  async up(knex) {
    // Modify existing data
    await knex("guests")
      .where("status", "old_value")
      .update({ status: "new_value" });
  },

  async down(knex) {
    // Rollback if needed
    await knex("guests")
      .where("status", "new_value")
      .update({ status: "old_value" });
  },
};
```

---

## Complete Workflow Diagram

```
┌─────────────────────────────────────────┐
│ 1. LOCAL DEVELOPMENT                   │
│    - Develop new features               │
│    - Modify content types              │
│    - Test with dummy data              │
│    - Commit code changes to Git        │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. STAGING (Optional but Recommended)  │
│    - Deploy code to staging server     │
│    - Import copy of production data    │
│    - Test with real-world data         │
│    - Verify everything works           │
└─────────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. PRODUCTION DEPLOYMENT               │
│    - Backup production database        │
│    - Deploy ONLY code changes          │
│    - Run migrations if needed          │
│    - Production data stays intact      │
└─────────────────────────────────────────┘
```

---

## Immediate Action Items

### Step-by-Step Checklist

- [ ] **Stop deploying your local database to production!**
- [ ] **Set up proper environment variables** for database connections
- [ ] **Create a backup script** for production database
- [ ] **Use version control** for all code and schema changes
- [ ] **Document your deployment process** in a workflow file
- [ ] **Consider setting up a staging environment** with production data copy

---

## Quick Fix for Current Situation

If you have production data you need to recover:

1. **Check if your hosting provider has automatic backups**
2. **Restore from the most recent backup**
3. **Re-deploy your new code WITHOUT the database**
4. **Manually add any new test data needed**

---

## Best Practices Summary

### Development Phase

1. Use local database for development
2. Create seed scripts for test data
3. Commit code and schema changes to version control
4. Never commit database files or sensitive .env files

### Testing Phase

1. Use staging environment with production data copy
2. Test all new features thoroughly
3. Verify migrations work correctly
4. Check for any breaking changes

### Deployment Phase

1. Backup production database
2. Deploy code changes only
3. Run database migrations if needed
4. Verify deployment success
5. Monitor for errors

### Post-Deployment

1. Verify all features work in production
2. Check logs for errors
3. Test critical user flows
4. Keep backup accessible for quick rollback

---

## Additional Resources

- [Strapi Deployment Guide](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html)
- [Strapi Data Transfer](https://docs.strapi.io/developer-docs/latest/developer-resources/data-management.html)
- [Environment Variables in Strapi](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/optional/environment.html)

---

**Last Updated**: December 12, 2024
