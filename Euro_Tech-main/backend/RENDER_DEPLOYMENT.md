# Render Deployment Guide for EuroTechnologies Backend

## Quick Fix for Current Error

The error "invalid local_resolve : lstat /opt/render/project/src/backend" means Render is looking in the wrong directory.

### Solution Steps:

1. **In Render Dashboard:**
   - Go to your service settings
   - Update the **Root Directory** to: `backend`
   - This tells Render where your backend code is located

2. **Build Command:** `mvn clean package -DskipTests`

3. **Start Command:** `java -Dserver.port=$PORT -Dspring.profiles.active=prod -jar target/bootcamp-api-1.0.0.jar`

4. **Environment Variables to Set:**
   ```
   SPRING_PROFILES_ACTIVE=prod
   JWT_SECRET=<generate-a-secure-random-string>
   DATABASE_URL=<your-mysql-connection-string>
   DATABASE_USERNAME=<your-db-username>
   DATABASE_PASSWORD=<your-db-password>
   CORS_ORIGINS=https://your-frontend-url.com
   ```

## Alternative: Use render.yaml

If you want to use the `render.yaml` file:

1. Push the `render.yaml` file to your repository root (not in backend folder)
2. In Render, create a new "Blueprint" and connect your repository
3. Render will automatically detect and use the configuration

## Database Setup

1. Create a MySQL database in Render:
   - Go to Dashboard → New → PostgreSQL (or use external MySQL)
   - Note: Render provides PostgreSQL for free, MySQL requires external service

2. For MySQL (recommended external options):
   - Railway.app
   - PlanetScale
   - AWS RDS Free Tier
   - Aiven

3. Update environment variables with your database credentials

## Testing Locally

```bash
# Set environment variables
export SPRING_PROFILES_ACTIVE=prod
export DATABASE_URL=jdbc:mysql://localhost:3306/bootcamp_db
export DATABASE_USERNAME=root
export DATABASE_PASSWORD=yourpassword

# Build
mvn clean package -DskipTests

# Run
java -jar target/bootcamp-api-1.0.0.jar
```

## Troubleshooting

### Error: "Cannot find module"
- Make sure Root Directory is set to `backend` in Render settings

### Error: "Build failed"
- Check Java version is set to 21
- Verify Maven is available

### Error: "Database connection failed"
- Verify DATABASE_URL format
- Check database credentials
- Ensure database allows external connections

## Health Check

Once deployed, check: `https://your-app.onrender.com/api/actuator/health`
