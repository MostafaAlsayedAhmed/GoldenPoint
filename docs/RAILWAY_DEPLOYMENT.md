# 🚀 Railway Deployment Guide for Strapi CMS

This guide will walk you through deploying your Strapi CMS to Railway.app with PostgreSQL database.

## 📋 Prerequisites

- GitHub account
- Railway account (sign up at [railway.app](https://railway.app))
- Git installed locally
- Your Strapi project committed to Git

---

## 🛠️ Step 1: Prepare Your Project

### 1.1 Generate Production Secrets

You need to generate secure random strings for production. Run these commands:

```powershell
# Generate APP_KEYS (comma-separated, 4 keys)
node -e "console.log(require('crypto').randomBytes(16).toString('base64') + ',' + require('crypto').randomBytes(16).toString('base64'))"

# Generate API_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate ADMIN_JWT_SECRET
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate TRANSFER_TOKEN_SALT
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"

# Generate ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

**Save these values somewhere safe** - you'll need them for Railway environment variables.

### 1.2 Commit Your Changes

```bash
git add .
git commit -m "Add Railway deployment configuration"
git push origin main
```

---

## 🚂 Step 2: Set Up Railway Project

### 2.1 Create New Project

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Authorize Railway to access your GitHub
5. Select your **GoldenPoint CMS repository**

### 2.2 Add PostgreSQL Database

1. In your Railway project dashboard, click **"+ New"**
2. Select **"Database"** → **"Add PostgreSQL"**
3. Railway will automatically provision a PostgreSQL database
4. Wait for the database to initialize (takes ~30 seconds)

---

## ⚙️ Step 3: Configure Environment Variables

### 3.1 Set Variables in Railway

1. Click on your **Strapi service** (not the database)
2. Go to **"Variables"** tab
3. Click **"+ New Variable"** and add the following:

#### Required Variables:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Use the values you generated in Step 1.1
APP_KEYS=your-generated-app-keys-here
API_TOKEN_SALT=your-generated-salt-here
ADMIN_JWT_SECRET=your-generated-secret-here
TRANSFER_TOKEN_SALT=your-generated-salt-here
JWT_SECRET=your-generated-secret-here
ENCRYPTION_KEY=your-generated-key-here

# Database settings (Railway provides these automatically)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=false
```

> **Note**: The `${{Postgres.*}}` variables are Railway's template syntax that automatically references your PostgreSQL database credentials.

### 3.2 Railway Auto-Configuration

Railway automatically provides these database variables from your PostgreSQL service:
- `Postgres.PGHOST`
- `Postgres.PGPORT`
- `Postgres.PGDATABASE`
- `Postgres.PGUSER`
- `Postgres.PGPASSWORD`

Simply use the template syntax above and Railway will handle the rest!

---

## 🚀 Step 4: Deploy

### 4.1 Trigger Deployment

1. Railway automatically deploys when you push to GitHub
2. Or click **"Deploy"** button in Railway dashboard
3. Monitor the build logs in the **"Deployments"** tab

### 4.2 Wait for Build

The build process will:
1. Install dependencies (`npm install`)
2. Build Strapi (`npm run build`)
3. Start the server (`npm run start`)

This takes approximately **3-5 minutes**.

### 4.3 Get Your URL

1. Go to **"Settings"** tab in your Strapi service
2. Click **"Generate Domain"** under **Networking**
3. Railway will provide a URL like: `https://your-app-name.up.railway.app`

---

## ✅ Step 5: Verify Deployment

### 5.1 Access Your Strapi Admin

1. Open your Railway URL in browser: `https://your-app-name.up.railway.app/admin`
2. Create your first admin user
3. Login to the admin panel

### 5.2 Test the API

Visit your API documentation:
```
https://your-app-name.up.railway.app/documentation
```

### 5.3 Check Database Connection

1. In Strapi admin, create a test content entry
2. Verify it's saved by refreshing the page
3. Check Railway PostgreSQL database to confirm data is stored

---

## 🔧 Step 6: Post-Deployment Configuration

### 6.1 Update Public URLs

Go back to Railway Variables and add:

```env
PUBLIC_URL=https://your-app-name.up.railway.app
PUBLIC_ADMIN_URL=https://your-app-name.up.railway.app/admin
```

Click **"Deploy"** to apply changes.

### 6.2 Configure CORS (If Needed)

If you have a frontend app, update `config/middlewares.ts`:

```typescript
export default [
  // ... other middlewares
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://your-frontend-domain.com', 'http://localhost:3000'],
    },
  },
];
```

Commit and push to trigger redeployment.

---

## 📊 Monitoring & Maintenance

### View Logs

1. Go to Railway project
2. Click on your Strapi service
3. Navigate to **"Logs"** tab
4. Monitor real-time application logs

### Database Backup

Railway provides automatic backups for PostgreSQL. To access:
1. Click on your **PostgreSQL service**
2. Go to **"Data"** tab
3. View and download backups

### Update Your App

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push origin main
```

Railway automatically redeploys on push.

---

## 🚨 Troubleshooting

### Build Fails

**Error**: `npm ERR! peer dependency errors`
**Solution**: 
```bash
npm install --legacy-peer-deps
git add package-lock.json
git commit -m "Fix peer dependencies"
git push
```

### Database Connection Error

**Error**: `Connection to database failed`
**Solutions**:
1. Verify database variables in Railway dashboard
2. Check that `DATABASE_CLIENT=postgres` is set
3. Ensure PostgreSQL service is running
4. Restart your Strapi service

### App Crashes on Startup

**Error**: `Application error`
**Solutions**:
1. Check Railway logs for specific error
2. Verify all environment variables are set
3. Ensure `NODE_ENV=production`
4. Check that build completed successfully

### Admin Panel Not Loading

**Error**: `Cannot GET /admin`
**Solutions**:
1. Ensure you ran `npm run build` (Railway does this automatically)
2. Check that `dist/` folder is created during build
3. Verify `NODE_ENV=production`

### Module Not Found Errors

**Error**: `Cannot find module 'pg'`
**Solution**: Already fixed! We installed `pg` package.

---

## 💰 Cost & Free Tier Limits

### Railway Free Tier Includes:
- **$5 free credits per month**
- Enough for:
  - 1 small Strapi app
  - 1 PostgreSQL database
  - ~500 hours of uptime

### When You'll Need to Pay:
- If your app exceeds $5/month in usage
- Typical usage: $3-8/month for small projects
- Monitor usage in Railway dashboard

---

## 🔐 Security Best Practices

### ✅ DO:
- Use strong, randomly generated secrets
- Enable HTTPS (Railway does this automatically)
- Regularly update dependencies
- Monitor logs for suspicious activity
- Use environment variables for all secrets

### ❌ DON'T:
- Commit `.env` file to Git
- Use default/weak secrets in production
- Expose admin panel without authentication
- Skip regular backups

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Strapi Deployment Guide](https://docs.strapi.io/dev-docs/deployment)
- [PostgreSQL on Railway](https://docs.railway.app/databases/postgresql)

---

## 🎉 Next Steps

After successful deployment:

1. ✅ Configure your domain (optional)
2. ✅ Set up monitoring/alerts
3. ✅ Create your first content types
4. ✅ Populate with content
5. ✅ Connect your frontend application
6. ✅ Set up automated backups
7. ✅ Configure email provider (for password reset, etc.)

---

## Need Help?

If you encounter issues:
1. Check Railway deployment logs
2. Review Strapi server logs
3. Verify all environment variables
4. Check the troubleshooting section above
5. Consult [Railway Discord](https://discord.gg/railway)

**Your Strapi CMS is now live on Railway! 🚀**
