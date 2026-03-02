# 🔧 IMMEDIATE FIX FOR RENDER DEPLOYMENT ERROR

## The Problem
Error: "invalid local_resolve : lstat /opt/render/project/src/backend: no such file or directory"

**Root Cause:** Render is looking for code in `/opt/render/project/src/backend` but your backend code is in `/opt/render/project/backend`

---

## ✅ SOLUTION - Follow These Steps:

### Step 1: Fix Root Directory in Render Dashboard

1. Go to https://dashboard.render.com
2. Click on your "EuroTechnologies" service
3. Click **"Settings"** (left sidebar)
4. Scroll to **"Build & Deploy"** section
5. Find **"Root Directory"** field
6. Change it from blank (or whatever it is) to: **`backend`**
7. Click **"Save Changes"**

### Step 2: Verify Build Settings

Make sure these are set correctly:

- **Environment:** `Docker` OR `Java`
- **Build Command:** `mvn clean package -DskipTests`
- **Start Command:** `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/bootcamp-api-1.0.0.jar`

### Step 3: Set Environment Variables

In Render Dashboard → Your Service → Environment:

Add these variables:

```
SPRING_PROFILES_ACTIVE = prod
JWT_SECRET = 404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
PORT = 8080
```

### Step 4: Database Configuration (Important!)

You need a MySQL database. Render doesn't provide free MySQL, so you have 2 options:

**Option A: Use PostgreSQL (Free on Render)**
1. Create PostgreSQL database in Render
2. Update `pom.xml` to use PostgreSQL instead of MySQL
3. Add PostgreSQL dependency

**Option B: Use External MySQL (Recommended)**
1. Use Railway.app, PlanetScale, or Aiven for free MySQL
2. Get connection string
3. Add to Render environment variables:
   ```
   DATABASE_URL = jdbc:mysql://host:port/database?useSSL=true
   DATABASE_USERNAME = your_username
   DATABASE_PASSWORD = your_password
   ```

### Step 5: Trigger Manual Deploy

1. In Render Dashboard → Your Service
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Watch the logs for any errors

---

## 🎯 Quick Checklist

- [ ] Root Directory set to `backend`
- [ ] Build Command: `mvn clean package -DskipTests`
- [ ] Start Command: `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/bootcamp-api-1.0.0.jar`
- [ ] Environment variables added
- [ ] Database configured
- [ ] Manual deploy triggered

---

## 📝 Expected Result

After fixing, you should see in logs:
```
==> Building...
==> Downloading Maven...
==> Running: mvn clean package -DskipTests
==> BUILD SUCCESS
==> Starting service...
==> Application started on port 8080
```

---

## ❌ If Still Failing

Check these common issues:

1. **Java Version Mismatch**
   - Add environment variable: `JAVA_VERSION = 21`

2. **Maven Not Found**
   - Render should auto-detect, but you can specify: `MAVEN_VERSION = 3.9.6`

3. **Database Connection Failed**
   - Verify database is running
   - Check connection string format
   - Ensure database allows external connections

4. **Port Binding Error**
   - Make sure start command includes: `-Dserver.port=$PORT`

---

## 🆘 Need More Help?

Share the new error logs from Render and I'll help you fix it!
