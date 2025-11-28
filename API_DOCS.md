# API Documentation (Swagger UI)

The API documentation is now available and configured for **Frontend Use (Read-Only)**.

## Accessing the Docs

1. **Open your browser**
2. Go to: [http://localhost:1337/documentation/v1.0.0](http://localhost:1337/documentation/v1.0.0)

## ✅ Frontend-Focused Documentation

We have configured the API to **only expose GET endpoints** (find and findOne).
This means:
- 🚫 No POST/PUT/DELETE endpoints will appear in the docs
- ✅ The documentation matches your "Public" role permissions
- ✅ It's clean and easy for frontend developers to read

## What You Can Do

- **Explore Endpoints**: See all available API routes for your content types.
- **Test Requests**: Execute API requests directly from the browser.
- **View Schemas**: See the data structure for requests and responses.

## Configuration

The API routes are restricted in the code (`src/api/*/routes/*.ts`) to ensure security and clarity.
If you ever need to enable `POST` (e.g. for a Contact Form), you can update the specific route file.
