# 🚀 90toZero Platform - Running Guide

## Current Status: ✅ BOTH SERVERS RUNNING

### Backend API Server
- **URL**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Status**: ✅ Running with SQLite database
- **Database**: SQLite (90tozero.db in backend folder)

### Frontend Application  
- **URL**: http://localhost:5173
- **Status**: ✅ Running with Vite dev server
- **Framework**: React 18 + TypeScript + Tailwind CSS

---

## 🔐 Demo Credentials

### 👑 Admin Account
- **Email**: admin@90tozero.com
- **Password**: Admin123
- **Dashboard**: http://localhost:5173/admin/dashboard

### 🏢 Company Accounts (3 available)
1. **Email**: demo.company@90tozero.com | **Password**: Company123
2. **Email**: hr@infosystems.com | **Password**: Company123
3. **Email**: talent@digitalminds.com | **Password**: Company123
- **Dashboard**: http://localhost:5173/company/dashboard

### 👨‍💼 Candidate Accounts (4 available)
1. **Email**: demo.candidate@90tozero.com | **Password**: Candidate123
2. **Email**: priya.sharma@email.com | **Password**: Candidate123
3. **Email**: amit.verma@email.com | **Password**: Candidate123
4. **Email**: sneha.patel@email.com | **Password**: Candidate123
- **Dashboard**: http://localhost:5173/candidate/dashboard

### 🏦 NBFC Partner Accounts (2 available)
1. **Email**: demo.nbfc@90tozero.com | **Password**: NBFC123
2. **Email**: contact@fastfinance.com | **Password**: NBFC123
- **Dashboard**: http://localhost:5173/nbfc/dashboard

---

## 📊 Database Summary

**Total Users**: 10 (1 Admin + 3 Companies + 4 Candidates + 2 NBFCs)

All accounts have complete profiles pre-populated with realistic dummy data including:
- Company profiles with industry info, contact details
- Candidate profiles with skills, CTC, notice periods
- NBFC profiles with loan terms, interest rates

---

## 🎯 Quick Testing Guide

1. **Login**: Visit http://localhost:5173/login
2. **Try Admin**: Login as admin@90tozero.com to see platform overview
3. **Test Candidate Flow**:
   - Login as demo.candidate@90tozero.com
   - View dashboard with profile stats
   - Try buyout calculator
4. **Test Company Flow**:
   - Login as demo.company@90tozero.com
   - Access company dashboard
5. **Test NBFC Flow**:
   - Login as demo.nbfc@90tozero.com
   - View NBFC dashboard

---

## 🔄 Restarting Servers

### Stop Servers
Press `Ctrl+C` in the terminal running each server

### Restart Backend
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Restart Frontend
```bash
cd frontend
npm run dev
```

### Reinitialize Database (if needed)
```bash
cd backend
python init_db.py
# Type 'y' when prompted to create sample data
```

---

## 📝 Features Available

### ✅ Implemented (MVP Phase 1)
- User authentication (JWT tokens)
- Multi-user type system (Admin/Company/Candidate/NBFC)
- Protected routes by user type
- User registration and login
- Profile creation forms
- Buyout calculator (public)
- Dashboard layouts for all user types
- Responsive design with Tailwind CSS

### 🚧 Coming Soon
- Job posting and applications
- Loan application workflow
- Company-Candidate matching
- Admin management panel
- Email notifications
- Document uploads
- Advanced search and filters

---

## 🛠️ Technology Stack

### Backend
- FastAPI (Python 3.11+)
- SQLAlchemy 2.0 (async ORM)
- SQLite (local dev)
- JWT authentication
- Pydantic validation

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- React Router v6
- Zustand (state management)
- Axios (API client)
- Tailwind CSS v3

---

## 📁 Project Structure

```
90toZero/
├── backend/
│   ├── app/
│   │   ├── api/          # API endpoints
│   │   ├── core/         # Config, database, security
│   │   ├── models/       # Database models
│   │   └── schemas/      # Pydantic schemas
│   ├── main.py           # FastAPI app entry
│   ├── init_db.py        # Database initialization
│   └── 90tozero.db       # SQLite database
│
├── frontend/
│   └── src/
│       ├── pages/        # React pages
│       ├── components/   # Reusable components
│       ├── services/     # API services
│       ├── store/        # Zustand stores
│       └── types/        # TypeScript types
│
└── spec.md               # Full project specification
```

---

## 🎉 Success!

Both backend and frontend are running successfully with:
- ✅ 10 fully configured user accounts
- ✅ Complete authentication system
- ✅ Type-safe frontend with TypeScript
- ✅ RESTful API with automatic docs
- ✅ Responsive UI design
- ✅ Local SQLite database

**Ready for testing and development!**
