# Authentication with NextAuth and MongoDB

This project implements user **signup and signin** in a Next.js application using **NextAuth.js** with both **Credentials Provider (email + password)** and optional **Google Provider**, backed by **MongoDB** for user storage.

---

## Overview

* **NextAuth.js** handles authentication flows, sessions, and providers.
* **MongoDB** is the database for storing user accounts.
* **SessionProvider** makes authentication state available throughout the app.
* After signup, users are automatically signed in.

---

## Step-by-Step Process

### 1. Setup Environment Variables

Define all required secrets and connection strings inside `.env.local`. This includes:

* MongoDB connection URL
* NextAuth secret key
* Google OAuth client credentials (if using Google login)

---

### 2. Install Required Packages

Add dependencies for authentication, database.

---

### 3. Create MongoDB Connection Helper

A utility function connects to MongoDB and returns collections. This ensures connection reuse in development and proper setup in production.

---

### 4. Configure NextAuth
* Create a authprovider and wrap the rootlayout under `app/providers/nextauthproviders.js`.
* Create a dynamic route under `app/api/auth/[...nextauth]/route.js`.
* Add **Credentials Provider** for email + password in route.js.
* Add **Google Provider** if needed.
* Use callbacks (`jwt`, `session`) to enrich the session with user information (id, name, email).
* Use a custom `authorize` method for validating user credentials from MongoDB.

---

### 5. Create Signup API

* Add an API route for handling new user registration.
* Validate incoming data (name, email, password).
* Check if a user already exists.
* Insert the new user into MongoDB.
* Return a success or error response.

---

### 6. Wrap Root Layout with Session Provider

* Use a `SessionProvider` wrapper around the application in `app/layout.jsx`.
* This enables `useSession()` in client components to access authentication state globally.

---

### 7. Build Signup Page

* Create a form that collects name, email, and password.
* Submit data to the signup API.
* On success, call `signIn()` programmatically with credentials.
* Redirect the user to the homepage or dashboard after successful sign in.

---

### 8. Build Login Page

* Create a form for existing users to log in with email and password.
* Call `signIn("credentials")` with the provided data.
* Handle errors with UI feedback.
* Redirect to the homepage or dashboard upon success.

---

### 9. Database Schema

The `users` collection in MongoDB stores:

* name
* email
* password
* timestamps (createdAt, updatedAt)

---

### 10. NextAuth Callbacks

* **authorize**: verifies credentials and returns the user.
* **jwt**: attaches user info into JWT on first login.
* **session**: attaches user info into session so it’s available in `useSession()`.

---

### 11. Common Errors & Fixes

* **Build errors (`startsWith` issue):** add `dynamic = "force-dynamic"` to NextAuth and API routes.Added environment variable while deploying.
* **Missing session data:** ensure the app is wrapped in `SessionProvider`.
* **Env not loaded in production:** verify environment variables on the hosting platform.

---

## User Flow

1. **New user signs up**

   * Data is validated and password is hashed.
   * User document is created in MongoDB.
   * NextAuth automatically signs them in.

2. **Existing user logs in**

   * Credentials are verified against MongoDB.
   * If valid, a session is created.

3. **Session management**

   * JWT stores user id, name, and email.
   * Session callback exposes this data to the client.

---

## Security Considerations

* Use `NEXTAUTH_SECRET` to secure cookies and JWTs.
* Add input validation on all authentication routes.
* Enable HTTPS in production.

---

## Next Steps

* Add email verification on signup.
* Add password reset flow.
* Add role-based access (admin, user).
* Track user activity with analytics tools.
* Deploy to production (Vercel recommended).

---

## Deployment Notes

* Add environment variables to the hosting platform (e.g., Vercel).
* Do not commit `.env.local`.
* Ensure MongoDB Atlas is set up with correct network access.
* Test signup and login in production environment.

---
