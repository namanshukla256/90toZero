# 🚀 Quick Start Guide - 90toZero Platform

## Prerequisites
- Docker & Docker Compose installed
- Terminal/Command Line access
- Web browser

---

## ⚡ Fast Setup (5 Minutes)

### Step 1: Navigate to Project Directory
```bash
cd /home/naman/Downloads/MyCode/90toZero
```

### Step 2: Make Scripts Executable
```bash
chmod +x setup.sh
chmod +x backend/test_api.sh
chmod +x backend/init_db.py
```

### Step 3: Run Setup Script
```bash
./setup.sh
```

This will:
- ✅ Create `.env` file
- ✅ Start PostgreSQL database
- ✅ Start Redis cache
- ✅ Start FastAPI backend
- ✅ Verify health checks

### Step 4: Initialize Database (Optional - for sample data)
```bash
cd backend
python init_db.py
```

When prompted, type `y` to create demo accounts.

### Step 5: Access the API
Open in your browser:
- **API Docs**: http://localhost:8000/docs
- **API**: http://localhost:8000

---

## 🎯 Test the API

### Option 1: Use Test Script
```bash
cd backend
./test_api.sh
```

### Option 2: Use Swagger UI
1. Go to http://localhost:8000/docs
2. Click "Try it out" on any endpoint
3. Fill in the request body
4. Click "Execute"

### Option 3: Use Demo Accounts (if you ran init_db.py)

**Login as Candidate:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.candidate@90tozero.com",
    "password": "Candidate123"
  }'
```

**Login as Company:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo.company@90tozero.com",
    "password": "Company123"
  }'
```

---

## 📝 Complete Workflow Example

### 1. Register a New Candidate
```bash
curl -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "SecurePass123",
    "user_type": "candidate"
  }'
```

**Save the `access_token` from the response!**

### 2. Create Candidate Profile
```bash
curl -X POST http://localhost:8000/api/v1/candidates/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "full_name": "John Doe",
    "phone": "+91-9876543210",
    "current_company": "ABC Technologies",
    "current_designation": "Senior Developer",
    "current_ctc": 1200000,
    "notice_period_days": 90,
    "skills": ["Python", "React", "AWS"],
    "experience_years": 5.5,
    "city": "Bangalore",
    "state": "Karnataka"
  }'
```

### 3. Calculate Buyout Amount
```bash
curl -X POST http://localhost:8000/api/v1/candidates/calculate-buyout \
  -H "Content-Type: application/json" \
  -d '{
    "current_monthly_salary": 100000,
    "notice_period_days": 90
  }'
```

**Result:** Buyout Amount = ₹3,00,000

---

## 🛠️ Useful Commands

### View Logs
```bash
docker-compose logs backend
docker-compose logs postgres
docker-compose logs redis
```

### Restart Services
```bash
docker-compose restart backend
```

### Stop All Services
```bash
docker-compose down
```

### Start Services Again
```bash
docker-compose up -d
```

### Access Database
```bash
docker exec -it 90tozero-postgres psql -U postgres -d 90tozero
```

### Access Redis
```bash
docker exec -it 90tozero-redis redis-cli
```

---

## 🔍 Verify Everything is Working

Run these checks:

### 1. Health Check
```bash
curl http://localhost:8000/health
```
Expected: `{"status":"healthy","environment":"development"}`

### 2. API Root
```bash
curl http://localhost:8000/
```
Expected: Welcome message with version

### 3. Check Docker Containers
```bash
docker ps
```
Expected: 3 containers running (postgres, redis, backend)

---

## 📚 Documentation Files

- `README.md` - Project overview and setup
- `PROGRESS.md` - What's been built so far
- `API_GUIDE.md` - Complete API reference
- `spec.md` - Full project specification
- `QUICKSTART.md` - This file

---

## 🆘 Troubleshooting

### Backend not starting?
```bash
# Check logs
docker-compose logs backend

# Rebuild container
docker-compose down
docker-compose up --build -d
```

### Database connection error?
```bash
# Check if postgres is running
docker ps | grep postgres

# Restart postgres
docker-compose restart postgres
```

### Port already in use?
```bash
# Change ports in docker-compose.yml
# For backend: Change "8000:8000" to "8001:8000"
# For postgres: Change "5432:5432" to "5433:5432"
```

---

## 🎯 Next Steps

### For Backend Development:
1. Add more API endpoints (jobs, applications, loans)
2. Implement file upload for documents
3. Add email notifications
4. Integrate payment gateway

### For Frontend Development:
1. Initialize React app with TypeScript
2. Create authentication pages
3. Build dashboard layouts
4. Implement profile forms
5. Add buyout calculator UI

### Phase 2 Features:
- KYC automation
- CIBIL integration
- Payment gateway
- Email/SMS notifications
- Advanced analytics

---

## 💡 Pro Tips

1. **Use Swagger UI** for testing - it's interactive and easier than cURL
2. **Save your tokens** - Copy access_token after login for subsequent requests
3. **Check logs** - Always check `docker-compose logs backend` if something fails
4. **Hot reload works** - Changes to Python files auto-reload the server
5. **Database persists** - Data is saved even after `docker-compose down`

---

## 🎉 You're All Set!

Your 90toZero backend is now running and ready for development!

Visit **http://localhost:8000/docs** to explore all available APIs.

Happy coding! 🚀
