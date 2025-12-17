# 90toZero Deployment Connection Guide

## Current Setup Status ✅

### Frontend (Vercel)
- **URL**: https://90to-zero.vercel.app/
- **Status**: ✅ Deployed

### Backend (Render) 
- **URL**: https://your-render-service-name.onrender.com
- **Status**: ⏳ Needs deployment

### Database (Render PostgreSQL)
- **URL**: dpg-d51epf4hg0os7388vbb0-a.virginia-postgres.render.com
- **Status**: ✅ Ready

---

## 🔧 Step-by-Step Connection Setup

### 1. Deploy Backend on Render

#### A. Create Web Service on Render:
1. Connect your GitHub repository
2. Set build and start commands:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python -m uvicorn main:app --host 0.0.0.0 --port $PORT`

#### B. Set Environment Variables in Render Dashboard:
```bash
DATABASE_URL=postgresql://db_90tozero_user:IUHEBjBEHNjgQe9AypytKEvFU0JmAehY@dpg-d51epf4hg0os7388vbb0-a.virginia-postgres.render.com/db_90tozero
SECRET_KEY=IUHEBjBEHNjgQe9AypytKEvFU0JmAehY
ENVIRONMENT=production
DEBUG=false
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
```

### 2. Update Frontend Configuration

#### A. Update `.env.production` with your actual Render URL:
```bash
VITE_API_URL=https://your-actual-render-service-name.onrender.com/api/v1
```

#### B. Set Environment Variable in Vercel Dashboard:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `VITE_API_URL` = `https://your-render-service-name.onrender.com/api/v1`

### 3. Test Connection

#### A. Backend Health Check:
Visit: `https://your-render-service-name.onrender.com/health`
Expected response:
```json
{
  "status": "healthy",
  "environment": "production",
  "database": "connected",
  "cors_origins": ["https://90to-zero.vercel.app"]
}
```

#### B. API Test Endpoint:
Visit: `https://your-render-service-name.onrender.com/api/v1/test`
Expected response:
```json
{
  "message": "API connection successful!",
  "environment": "production",
  "timestamp": "2024-01-28T10:30:00Z",
  "frontend_url": "https://90to-zero.vercel.app"
}
```

#### C. Frontend Connection (Development):
- Run `npm run dev` locally
- Look for the connection test widget in bottom-right corner
- All connections should show ✅

---

## 🐛 Troubleshooting

### Backend Issues:
1. **"Field required" errors**: Check environment variables in Render dashboard
2. **Port binding errors**: Ensure start command uses `--port $PORT`
3. **CORS errors**: Verify frontend URL is in CORS origins

### Frontend Issues:
1. **Network errors**: Check `VITE_API_URL` environment variable
2. **Authentication issues**: Verify backend `/auth` endpoints are working

### Database Issues:
1. **Connection errors**: Test database URL in Render logs
2. **Migration errors**: Check if tables are created properly

---

## 🧪 Testing Checklist

- [ ] Backend health endpoint responds
- [ ] API test endpoint responds
- [ ] Frontend loads without errors
- [ ] CORS allows cross-origin requests
- [ ] Database connection works
- [ ] Authentication flow works
- [ ] API calls from frontend succeed

---

## 🔗 Important URLs

Replace `your-render-service-name` with your actual Render service name:

- **Frontend**: https://90to-zero.vercel.app/
- **Backend**: https://your-render-service-name.onrender.com
- **API Docs**: https://your-render-service-name.onrender.com/docs
- **Health Check**: https://your-render-service-name.onrender.com/health