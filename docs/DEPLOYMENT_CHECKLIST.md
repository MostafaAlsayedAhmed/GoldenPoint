# Railway Deployment Checklist

Use this checklist to ensure smooth deployment to Railway.

## Pre-Deployment ✅

- [ ] Install PostgreSQL driver: `npm install pg`
- [ ] Review production configs in `config/env/production/`
- [ ] Generate production secrets (see RAILWAY_DEPLOYMENT.md Step 1.1)
- [ ] Commit all changes to Git
- [ ] Push to GitHub

## Railway Setup ✅

- [ ] Sign up/login to Railway.app
- [ ] Create new project from GitHub repo
- [ ] Add PostgreSQL database service
- [ ] Wait for database initialization

## Environment Variables ✅

Copy these to Railway Variables tab:

```env
NODE_ENV=production
HOST=0.0.0.0
PORT=1337

# Your generated secrets
APP_KEYS=
API_TOKEN_SALT=
ADMIN_JWT_SECRET=
TRANSFER_TOKEN_SALT=
JWT_SECRET=
ENCRYPTION_KEY=

# Database (use Railway template variables)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_SSL=false
```

## Deployment ✅

- [ ] Trigger deployment (automatic on GitHub push)
- [ ] Monitor build logs
- [ ] Wait for successful deployment (3-5 mins)
- [ ] Generate Railway domain
- [ ] Access admin panel at: `https://your-app.railway.app/admin`

## Post-Deployment ✅

- [ ] Create first admin user
- [ ] Test API endpoints
- [ ] Verify database connection
- [ ] Add PUBLIC_URL environment variables
- [ ] Configure CORS if needed
- [ ] Set up database backups
- [ ] Monitor application logs

---

## Quick Commands

### Generate Secrets (PowerShell)
```powershell
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

### View Deployment
```bash
# Visit these URLs after deployment:
https://your-app.railway.app/admin
https://your-app.railway.app/documentation
https://your-app.railway.app/api/courses
```

---

**Full Guide**: See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed instructions.
